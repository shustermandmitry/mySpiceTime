import { ApolloServer } from '@apollo/server';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { join } from 'path';

// Custom data source that includes auth headers
class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    // Forward the auth token to underlying services
    if (context.token) {
      request.http.headers.set('Authorization', context.token);
    }
  }
}

async function startGatewayServer() {
  // Load the schema
  const typeDefs = readFileSync(
    join(__dirname, 'schema.graphql'),
    'utf-8'
  );

  // Configure the gateway
  const gateway = new ApolloGateway({
    supergraphSdl: typeDefs,
    buildService({ name, url }) {
      return new AuthenticatedDataSource({ url });
    },
    experimental_pollInterval: 10000, // Poll for schema changes every 10s
  });

  // Create Apollo Server
  const server = new ApolloServer({
    gateway,
    subscriptions: {
      path: '/subscriptions',
    },
    context: async ({ req }) => {
      // Extract token from Authorization header
      const token = req.headers.authorization || '';
      
      return { 
        token,
        // Add other context values as needed
      };
    },
    plugins: [
      // Logging plugin
      {
        async requestDidStart({ request, context }) {
          console.log('Request started:', request.query);
          
          return {
            async willSendResponse({ response }) {
              console.log('Response sent:', response);
            },
            async didEncounterErrors({ errors }) {
              console.error('GraphQL errors:', errors);
            },
          };
        },
      },
    ],
  });

  // Start the server
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Gateway ready at ${url}`);
}

// Error handling
process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

startGatewayServer().catch((error) => {
  console.error('Failed to start gateway:', error);
  process.exit(1);
});
