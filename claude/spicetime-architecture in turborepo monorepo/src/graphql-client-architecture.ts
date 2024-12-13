// packages/internal/graphql/client/src/index.ts

import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';

export interface SpiceTimeClientConfig {
  httpUrl: string;
  wsUrl: string;
  getAuth?: () => Promise<string | null>;
}

export function createSpiceTimeClient({
  httpUrl,
  wsUrl,
  getAuth,
}: SpiceTimeClientConfig) {
  // HTTP Link with auth
  const httpLink = new HttpLink({
    uri: httpUrl,
  });

  // WebSocket Link for subscriptions
  const wsLink = new GraphQLWsLink(
    createClient({
      url: wsUrl,
      connectionParams: async () => {
        const token = getAuth ? await getAuth() : null;
        return token ? { Authorization: token } : {};
      },
    })
  );

  // Auth Link for adding headers
  const authLink = setContext(async (_, { headers }) => {
    const token = getAuth ? await getAuth() : null;
    return {
      headers: {
        ...headers,
        authorization: token ? token : "",
      }
    };
  });

  // Split links for subscription vs query/mutation
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    authLink.concat(httpLink)
  );

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
}

// Generated types from our schema
export * from './generated/graphql';

// Hooks for common operations
export * from './hooks';
