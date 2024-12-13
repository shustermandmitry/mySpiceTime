// packages/clients/web/src/providers/apollo.tsx
import { ApolloProvider } from '@apollo/client';
import { createSpiceTimeClient } from '@spicetime/graphql-client';

const client = createSpiceTimeClient({
  httpUrl: process.env.NEXT_PUBLIC_GRAPHQL_HTTP_URL!,
  wsUrl: process.env.NEXT_PUBLIC_GRAPHQL_WS_URL!,
  getAuth: async () => localStorage.getItem('auth_token'),
});

export function SpiceTimeApolloProvider({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}

// pages/_app.tsx
import { SpiceTimeApolloProvider } from '../providers/apollo';

function MyApp({ Component, pageProps }) {
  return (
    <SpiceTimeApolloProvider>
      <Component {...pageProps} />
    </SpiceTimeApolloProvider>
  );
}

// components/AgentList.tsx
import { useQuery } from '@apollo/client';
import { GetAgentsDocument } from '@spicetime/graphql-client';

export function AgentList() {
  const { data, loading } = useQuery(GetAgentsDocument);

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {data?.agents.map(agent => (
        <li key={agent.id}>{agent.name}</li>
      ))}
    </ul>
  );
}
