// packages/services/gateway/src/auth/types.ts
export interface UserContext {
  id: string;
  roles: UserRole[];
  permissions: Permission[];
  metadata: Record<string, any>;
}

export interface AuthContext {
  user?: UserContext;
  token?: string;
  isAuthenticated: boolean;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  USER = 'USER',
  AI_AGENT = 'AI_AGENT'
}

export enum Permission {
  READ_AGENTS = 'READ_AGENTS',
  MANAGE_AGENTS = 'MANAGE_AGENTS',
  READ_TASKS = 'READ_TASKS',
  MANAGE_TASKS = 'MANAGE_TASKS',
  MANAGE_USERS = 'MANAGE_USERS',
  MANAGE_RESOURCES = 'MANAGE_RESOURCES'
}

// packages/services/gateway/src/auth/jwt.ts
import jwt from 'jsonwebtoken';
import { UserContext, AuthContext } from './types';

export class JWTAuthenticator {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: string = '24h'
  ) {}

  async createToken(user: UserContext): Promise<string> {
    return jwt.sign(
      { 
        id: user.id,
        roles: user.roles,
        permissions: user.permissions 
      },
      this.secret,
      { expiresIn: this.expiresIn }
    );
  }

  async verifyToken(token: string): Promise<UserContext> {
    const decoded = jwt.verify(token, this.secret) as UserContext;
    return decoded;
  }
}

// packages/services/gateway/src/auth/permissions.ts
import { GraphQLSchema } from 'graphql';
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils';
import { AuthContext, Permission } from './types';
import { GraphQLError } from 'graphql';

export function authDirectiveTransformer(schema: GraphQLSchema) {
  return mapSchema(schema, {
    // Check object type fields
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const requiresAuth = getDirective(schema, fieldConfig, 'requiresAuth')?.[0];
      const requiresPermissions = getDirective(schema, fieldConfig, 'requiresPermissions')?.[0];

      if (requiresAuth || requiresPermissions) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = async function (source, args, context, info) {
          const auth = context.auth as AuthContext;

          // Check authentication
          if (!auth.isAuthenticated) {
            throw new GraphQLError('Not authenticated', {
              extensions: { code: 'UNAUTHENTICATED' }
            });
          }

          // Check permissions
          if (requiresPermissions?.permissions) {
            const hasPermissions = requiresPermissions.permissions.every(
              (permission: Permission) => auth.user?.permissions.includes(permission)
            );

            if (!hasPermissions) {
              throw new GraphQLError('Not authorized', {
                extensions: { code: 'FORBIDDEN' }
              });
            }
          }

          return resolve(source, args, context, info);
        };
      }
      return fieldConfig;
    }
  });
}

// packages/services/gateway/src/auth/context.ts
import { JWTAuthenticator } from './jwt';
import { AuthContext } from './types';

export async function createAuthContext(
  auth: JWTAuthenticator,
  req: any
): Promise<AuthContext> {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return { isAuthenticated: false };
    }

    const user = await auth.verifyToken(token);
    
    return {
      user,
      token,
      isAuthenticated: true
    };
  } catch (error) {
    return { isAuthenticated: false };
  }
}

// packages/services/gateway/src/index.ts
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { JWTAuthenticator } from './auth/jwt';
import { createAuthContext } from './auth/context';
import { authDirectiveTransformer } from './auth/permissions';

async function startGatewayServer() {
  const auth = new JWTAuthenticator(process.env.JWT_SECRET!);

  // Transform schema with auth directives
  const schema = authDirectiveTransformer(baseSchema);

  const server = new ApolloServer({
    schema,
    plugins: [
      // Logging plugin for auth events
      {
        async requestDidStart({ request, context }) {
          const auth = context.auth as AuthContext;
          console.log(`Request authenticated: ${auth.isAuthenticated}`, {
            userId: auth.user?.id,
            roles: auth.user?.roles,
          });
        },
      },
    ],
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({
      auth: await createAuthContext(auth, req),
    }),
    listen: { port: 4000 },
  });

  console.log(`🚀 Gateway ready at ${url}`);
}

// Example schema with auth directives
const typeDefs = `
  directive @requiresAuth on FIELD_DEFINITION
  directive @requiresPermissions(permissions: [String!]!) on FIELD_DEFINITION

  type Query {
    # Public endpoint
    publicData: String

    # Requires authentication
    privateData: String @requiresAuth

    # Requires specific permissions
    agents: [Agent!]! @requiresAuth @requiresPermissions(permissions: ["READ_AGENTS"])
    
    # Admin only
    users: [User!]! @requiresAuth @requiresPermissions(permissions: ["MANAGE_USERS"])
  }

  type Mutation {
    # Public mutations
    login(input: LoginInput!): AuthResponse!
    
    # Protected mutations
    createAgent(input: CreateAgentInput!): Agent! 
      @requiresAuth 
      @requiresPermissions(permissions: ["MANAGE_AGENTS"])
    
    updateUser(id: ID!, input: UpdateUserInput!): User! 
      @requiresAuth 
      @requiresPermissions(permissions: ["MANAGE_USERS"])
  }
`;
