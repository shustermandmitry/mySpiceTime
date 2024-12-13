import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { PubSub } from 'graphql-subscriptions';
import { GraphQLError } from 'graphql';

// In-memory store for demo purposes
// In production, use a proper database
const agents = new Map();
const pubsub = new PubSub();

const typeDefs = `
  # Import shared types from schema
  scalar DateTime
  scalar JSON

  type Agent {
    id: ID!
    name: String!
    specialization: String!
    status: AgentStatus!
    capabilities: [String!]!
    currentTasks: [Task!]!
    learningProgress: JSON
    metrics: AgentMetrics
  }

  type AgentMetrics {
    taskCompletionRate: Float!
    averageResponseTime: Float!
    learningRate: Float!
    collaborationScore: Float!
  }

  enum AgentStatus {
    ACTIVE
    LEARNING
    IDLE
    DISABLED
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: TaskStatus!
    priority: TaskPriority!
    assignedTo: Agent
    createdBy: User!
    createdAt: DateTime!
    updatedAt: DateTime!
    completedAt: DateTime
    metadata: JSON
  }

  enum TaskStatus {
    PENDING
    IN_PROGRESS
    COMPLETED
    FAILED
    CANCELLED
  }

  enum TaskPriority {
    LOW
    MEDIUM
    HIGH
    CRITICAL
  }

  type Query {
    agent(id: ID!): Agent
    agents(status: AgentStatus, specialization: String): [Agent!]!
  }

  type Mutation {
    createAgent(input: CreateAgentInput!): Agent!
    updateAgent(id: ID!, input: UpdateAgentInput!): Agent!
    assignTask(agentId: ID!, taskId: ID!): Task!
  }

  type Subscription {
    agentStatusUpdated(id: ID!): Agent!
  }

  input CreateAgentInput {
    name: String!
    specialization: String!
    capabilities: [String!]!
  }

  input UpdateAgentInput {
    name: String
    specialization: String
    capabilities: [String!]
    status: AgentStatus
  }
`;

const resolvers = {
  Query: {
    agent: (_, { id }) => {
      const agent = agents.get(id);
      if (!agent) {
        throw new GraphQLError('Agent not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }
      return agent;
    },
    agents: (_, { status, specialization }) => {
      let filteredAgents = Array.from(agents.values());
      
      if (status) {
        filteredAgents = filteredAgents.filter(a => a.status === status);
      }
      
      if (specialization) {
        filteredAgents = filteredAgents.filter(
          a => a.specialization === specialization
        );
      }
      
      return filteredAgents;
    },
  },
  
  Mutation: {
    createAgent: (_, { input }) => {
      const id = `agent_${Date.now()}`;
      const agent = {
        id,
        ...input,
        status: 'IDLE',
        currentTasks: [],
        learningProgress: {},
        metrics: {
          taskCompletionRate: 0,
          averageResponseTime: 0,
          learningRate: 0,
          collaborationScore: 0,
        },
      };
      
      agents.set(id, agent);
      return agent;
    },
    
    updateAgent: (_, { id, input }) => {
      const agent = agents.get(id);
      if (!agent) {
        throw new GraphQLError('Agent not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }
      
      const updatedAgent = {
        ...agent,
        ...input,
        updatedAt: new Date().toISOString(),
      };
      
      agents.set(id, updatedAgent);
      pubsub.publish('AGENT_UPDATED', { agentStatusUpdated: updatedAgent });
      
      return updatedAgent;
    },
    
    assignTask: async (_, { agentId, taskId }) => {
      const agent = agents.get(agentId);
      if (!agent) {
        throw new GraphQLError('Agent not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }
      
      // In a real implementation, fetch task from task service
      const task = {
        id: taskId,
        status: 'IN_PROGRESS',
        assignedTo: agent,
      };
      
      agent.currentTasks.push(task);
      return task;
    },
  },
  
  Subscription: {
    agentStatusUpdated: {
      subscribe: (_, { id }) => pubsub.asyncIterator(['AGENT_UPDATED']),
    },
  },
};

async function startAgentService() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });

  console.log(`🤖 Agent service ready at ${url}`);
}

startAgentService().catch((error) => {
  console.error('Failed to start agent service:', error);
  process.exit(1);
});
