const fs = require('fs');
const path = require('path');

function mkdirp(dir) {
  if (fs.existsSync(dir)) return;
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, content) {
  mkdirp(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

// Base package configurations
const packages = {
  'monorepo/internal/graphql/schema': {
    packageJson: {
      name: '@spicetime/graphql-schema',
      version: '0.0.1',
      private: true,
      main: 'dist/index.js',
      types: 'dist/index.d.ts',
      dependencies: {
        graphql: '^16.8.1'
      },
      devDependencies: {
        typescript: '^5.0.0'
      }
    },
    files: {
      'src/index.js': `const schema = require('./schema');
module.exports = schema;`,
      'src/schema.js': `const { gql } = require('graphql-tag');

const typeDefs = gql\`
  scalar DateTime
  scalar JSON

  enum PermissionScope {
    SYSTEM
    USER
    AGENT
    TASK
    RESOURCE
    AI
  }

  # Rest of schema will be implemented here
\`;

module.exports = typeDefs;`
    }
  },

  'monorepo/internal/graphql/client': {
    packageJson: {
      name: '@spicetime/graphql-client',
      version: '0.0.1',
      private: true,
      main: 'dist/index.js',
      types: 'dist/index.d.ts',
      dependencies: {
        '@apollo/client': '^3.8.8',
        'graphql': '^16.8.1',
        'graphql-ws': '^5.14.2'
      },
      devDependencies: {
        typescript: '^5.0.0'
      }
    },
    files: {
      'src/index.js': `const { createClient } = require('./client');
module.exports = { createClient };`,
      'src/client.js': `const { ApolloClient, InMemoryCache, split, HttpLink } = require('@apollo/client');
const { GraphQLWsLink } = require('@apollo/client/link/subscriptions');
const { createClient: createWsClient } = require('graphql-ws');

function createClient({ httpUrl, wsUrl, getAuth }) {
  // Implementation here
}

module.exports = { createClient };`
    }
  },

  'monorepo/packages/services/gateway': {
    packageJson: {
      name: '@spicetime/gateway',
      version: '0.0.1',
      private: true,
      dependencies: {
        '@apollo/server': '^4.9.5',
        '@apollo/gateway': '^2.5.6',
        'graphql': '^16.8.1'
      },
      devDependencies: {
        'nodemon': '^3.0.2'
      }
    },
    files: {
      'src/index.js': `const { startGateway } = require('./gateway');

startGateway().catch(error => {
  console.error('Failed to start gateway:', error);
  process.exit(1);
});`,
      'src/gateway.js': `const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

async function startGateway() {
  // Implementation here
}

module.exports = { startGateway };`
    }
  },

  'monorepo/packages/services/auth': {
    packageJson: {
      name: '@spicetime/auth',
      version: '0.0.1',
      private: true,
      dependencies: {
        '@apollo/server': '^4.9.5',
        'graphql': '^16.8.1',
        'jsonwebtoken': '^9.0.2'
      }
    },
    files: {
      'src/index.js': `const { startAuthService } = require('./service');

startAuthService().catch(error => {
  console.error('Failed to start auth service:', error);
  process.exit(1);
});`,
      'src/service.js': `const { ApolloServer } = require('@apollo/server');
const jwt = require('jsonwebtoken');

async function startAuthService() {
  // Implementation here
}

module.exports = { startAuthService };`
    }
  }
};

// Create and populate each package
Object.entries(packages).forEach(([packagePath, config]) => {
  // Create package directory
  mkdirp(packagePath);

  // Write package.json
  writeFile(
    path.join(packagePath, 'package.json'),
    JSON.stringify(config.packageJson, null, 2)
  );

  // Write package files
  if (config.files) {
    Object.entries(config.files).forEach(([filePath, content]) => {
      writeFile(path.join(packagePath, filePath), content);
    });
  }

  // Create basic README
  writeFile(
    path.join(packagePath, 'README.md'),
    `# ${config.packageJson.name}\n\nPart of the SpiceTime GraphQL layer.\n`
  );

  // Create src directory if it doesn't exist
  mkdirp(path.join(packagePath, 'src'));
});

console.log('✨ GraphQL packages populated successfully!');
console.log('Next steps:');
console.log('1. Run pnpm install');
console.log('2. Implement the full schema in graphql-schema package');
console.log('3. Complete the client implementation');
console.log('4. Set up the gateway service');
console.log('5. Configure the auth service');
