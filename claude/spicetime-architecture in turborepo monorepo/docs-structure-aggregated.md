# SpiceTime Documentation Structure

## Physical Structure (Source)
```
spicetime-architecture/
├── packages/services/api/
│   ├── docs/                    # Local API docs
│   │   ├── README.md
│   │   └── endpoints.md
├── packages/services/auth/
│   ├── docs/                    # Local Auth docs
│   │   ├── README.md
│   │   └── flows.md
└── ... (other packages)
```

## Aggregated Structure (Generated)
```
spicetime-architecture/
├── docs/                           # Aggregated documentation
│   ├── .generated/                # Auto-generated API docs
│   ├── services/                  # Services documentation
│   │   ├── api/                  # Copied from packages/services/api/docs
│   │   │   ├── README.md
│   │   │   └── endpoints.md
│   │   └── auth/                 # Copied from packages/services/auth/docs
│   │       ├── README.md
│   │       └── flows.md
│   ├── clients/                   # Client documentation
│   │   ├── web/                  # Copied from packages/clients/web/docs
│   │   └── admin/                # Copied from packages/clients/admin/docs
│   ├── core/                      # Core documentation
│   │   ├── utils/                # Copied from internal/core/utils/docs
│   │   └── graphql/              # Copied from internal/graphql/docs
│   └── tools/                     # Tools documentation
│       ├── eslint/               # Copied from tools/eslint-config/docs
│       └── typescript/           # Copied from tools/tsconfig/docs
```

Let me create a script that handles this synchronization:

<antArtifact identifier="docs-sync" type="application/vnd.ant.code" language="javascript" title="Documentation Synchronization Script">
// scripts/sync-docs.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = 'spicetime-architecture';
const DOCS_DIR = path.join(ROOT_DIR, 'docs');

// Documentation source mappings
const DOC_MAPPINGS = [
  {
    source: 'packages/services/api/docs',
    target: 'docs/services/api',
    title: 'API Service'
  },
  {
    source: 'packages/services/auth/docs',
    target: 'docs/services/auth',
    title: 'Authentication Service'
  },
  {
    source: 'packages/clients/web/docs',
    target: 'docs/clients/web',
    title: 'Web Client'
  },
  {
    source: 'packages/clients/admin/docs',
    target: 'docs/clients/admin',
    title: 'Admin Client'
  },
  {
    source: 'internal/core/utils/docs',
    target: 'docs/core/utils',
    title: 'Core Utilities'
  },
  {
    source: 'internal/graphql/docs',
    target: 'docs/core/graphql',
    title: 'GraphQL System'
  },
  {
    source: 'tools/eslint-config/docs',
    target: 'docs/tools/eslint',
    title: 'ESLint Configuration'
  },
  {
    source: 'tools/tsconfig/docs',
    target: 'docs/tools/typescript',
    title: 'TypeScript Configuration'
  }
];

function copyDocs(sourcePath, targetPath) {
  if (!fs.existsSync(sourcePath)) {
    console.warn(`Warning: Source path does not exist: ${sourcePath}`);
    return;
  }

  // Create target directory
  fs.mkdirSync(targetPath, { recursive: true });

  // Copy all files and directories
  const files = fs.readdirSync(sourcePath);
  files.forEach(file => {
    const sourceFile = path.join(sourcePath, file);
    const targetFile = path.join(targetPath, file);

    if (fs.statSync(sourceFile).isDirectory()) {
      copyDocs(sourceFile, targetFile);
    } else {
      fs.copyFileSync(sourceFile, targetFile);
    }
  });
}

function generateSidebar() {
  const sidebar = DOC_MAPPINGS.map(mapping => ({
    title: mapping.title,
    path: mapping.target.replace('docs/', ''),
    children: []
  }));

  fs.writeFileSync(
    path.join(DOCS_DIR, 'sidebar.json'),
    JSON.stringify(sidebar, null, 2)
  );
}

function generateIndexPage() {
  const index = `# SpiceTime Documentation

## Available Documentation

${DOC_MAPPINGS.map(mapping => `
### ${mapping.title}
- [Documentation](/${mapping.target.replace('docs/', '')})
`).join('\n')}
`;

  fs.writeFileSync(path.join(DOCS_DIR, 'index.md'), index);
}

function syncDocs() {
  try {
    // Ensure docs directory exists
    fs.mkdirSync(DOCS_DIR, { recursive: true });

    // Copy all documentation
    DOC_MAPPINGS.forEach(mapping => {
      const sourcePath = path.join(ROOT_DIR, mapping.source);
      const targetPath = path.join(ROOT_DIR, mapping.target);
      copyDocs(sourcePath, targetPath);
    });

    // Generate sidebar and index
    generateSidebar();
    generateIndexPage();

    console.log('✨ Documentation synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing documentation:', error);
    process.exit(1);
  }
}

// Watch mode for development
function watchDocs() {
  const chokidar = require('chokidar');
  
  DOC_MAPPINGS.forEach(mapping => {
    const sourcePath = path.join(ROOT_DIR, mapping.source);
    chokidar.watch(sourcePath).on('change', (changedPath) => {
      console.log(`Change detected in ${changedPath}`);
      syncDocs();
    });
  });

  console.log('Watching for documentation changes...');
}

// CLI handling
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--watch')) {
    watchDocs();
  } else {
    syncDocs();
  }
}

module.exports = {
  syncDocs,
  watchDocs
};
