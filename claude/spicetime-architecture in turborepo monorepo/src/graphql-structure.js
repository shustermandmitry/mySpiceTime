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

// Create main GraphQL structure
const dirs = [
  // Core GraphQL packages
  'monorepo/internal/graphql/schema',          // Shared schema definitions
  'monorepo/internal/graphql/client',          // Shared client utilities
  'monorepo/internal/graphql/directives',      // Custom directives
  'monorepo/internal/graphql/scalars',         // Custom scalar types
  
  // Services
  'monorepo/packages/services/gateway',        // GraphQL gateway service
  'monorepo/packages/services/auth',           // Auth service with GraphQL
  'monorepo/packages/services/agent-service',  // AI Agent service
  
  // Example implementations
  'docs/examples/graphql/schema',
  'docs/examples/graphql/gateway',
  'docs/examples/graphql/client'
];

dirs.forEach(dir => mkdirp(dir));

// Create package.json files for each main package
const packages = {
  'monorepo/internal/graphql/client/package.json': {
    name: '@spicetime/graphql-client',
    version: '0.0.1',
    private: true,
    main: 'dist/index.js',
    types: 'dist/index.d.ts'
  },
  'monorepo/packages/services/gateway/package.json': {
    name: '@spicetime/gateway',
    version: '0.0.1',
    private: true
  },
  'monorepo/packages/services/auth/package.json': {
    name: '@spicetime/auth',
    version: '0.0.1',
    private: true
  },
  'monorepo/packages/services/agent-service/package.json': {
    name: '@spicetime/agent-service',
    version: '0.0.1',
    private: true
  }
};

// Write initial package.json files
Object.entries(packages).forEach(([filePath, content]) => {
  writeFile(filePath, JSON.stringify(content, null, 2));
});

// Create README files
const readmeContent = pkg => `# ${pkg}
This package is part of the SpiceTime GraphQL layer.
`;

Object.keys(packages).forEach(pkgPath => {
  const dir = path.dirname(pkgPath);
  writeFile(path.join(dir, 'README.md'), readmeContent(packages[pkgPath].name));
});

console.log('✨ GraphQL structure created successfully!');
console.log('Next steps:');
console.log('1. Set up individual packages');
console.log('2. Implement shared schema');
console.log('3. Configure gateway service');
console.log('4. Add example implementations');
