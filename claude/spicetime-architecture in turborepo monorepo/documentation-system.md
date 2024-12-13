# SpiceTime Documentation System

## Core Principles

1. Single Source of Truth
   - Documentation lives alongside code
   - Generated docs reflect current state
   - Version control for all documentation
   - Automated synchronization

2. Consistency Enforcement
   - Standard templates
   - Automated linting
   - Style guide compliance
   - Cross-reference validation

3. Automation First
   - Generated from source code
   - API documentation from schemas
   - Component documentation from types
   - Architecture diagrams from code

## Implementation Structure

```
spicetime-architecture/
├── docs/                           # Documentation root
│   ├── .generated/                 # Generated documentation
│   ├── architecture/               # Architecture documentation
│   │   ├── diagrams/              # Architecture diagrams
│   │   └── decisions/             # Architecture decisions
│   ├── api/                       # API documentation
│   │   ├── graphql/              # GraphQL schema docs
│   │   └── rest/                 # REST API docs
│   └── development/              # Development guides
├── .docs/                         # Documentation tooling
│   ├── scripts/                   # Documentation scripts
│   ├── templates/                 # Documentation templates
│   └── config/                    # Documentation config
└── website/                       # Documentation site
    └── docs/                      # Gatsby documentation site
```

## Automation Tools

### 1. TypeDoc Configuration
```js
// .docs/config/typedoc.js
module.exports = {
  entryPoints: ["src/index.ts"],
  out: "docs/.generated/api",
  theme: "default",
  excludePrivate: true,
  excludeProtected: true,
  excludeExternals: true,
  plugin: [
    "typedoc-plugin-markdown",
    "@mxssfd/typedoc-theme"
  ]
};
```

### 2. GraphQL Documentation
```js
// .docs/config/graphdoc.js
module.exports = {
  endpoint: "./schema.graphql",
  output: "./docs/.generated/graphql",
  force: true,
  verbose: true,
  template: ".docs/templates/graphql"
};
```

### 3. Architecture Documentation
```js
// .docs/config/c4builder.js
module.exports = {
  plantumlVersion: "1.2022.7",
  outputDirectory: "docs/.generated/architecture",
  diagramFormat: "svg",
  templateDirectory: ".docs/templates/c4"
};
```

## Automation Scripts

### 1. Documentation Generation
```javascript
// .docs/scripts/generate-docs.js
const typedoc = require('typedoc');
const graphdoc = require('@2fd/graphdoc');
const c4builder = require('c4builder');

async function generateDocs() {
  // TypeDoc Generation
  const app = new typedoc.Application();
  app.options.addReader(new typedoc.TSConfigReader());
  app.generateDocs(app.expandInputFiles(['src']), 'docs/.generated/api');

  // GraphQL Documentation
  await graphdoc.build(require('../config/graphdoc'));

  // Architecture Documentation
  await c4builder.build(require('../config/c4builder'));
}

generateDocs().catch(console.error);
```

### 2. Documentation Validation
```javascript
// .docs/scripts/validate-docs.js
const markdownlint = require('markdownlint');
const linkCheck = require('markdown-link-check');
const glob = require('glob');

async function validateDocs() {
  // Markdown Linting
  const files = glob.sync('docs/**/*.md');
  const results = await markdownlint({
    files,
    config: require('../config/markdownlint.json')
  });

  // Link Validation
  await Promise.all(files.map(async (file) => {
    const links = await linkCheck(file);
    return validateLinks(links);
  }));
}

validateDocs().catch(console.error);
```

### 3. Documentation Sync
```javascript
// .docs/scripts/sync-docs.js
const chokidar = require('chokidar');
const { execSync } = require('child_process');

function syncDocs() {
  // Watch for changes
  chokidar.watch([
    'src/**/*.ts',
    'src/**/*.tsx',
    'schema.graphql',
    'docs/**/*.md'
  ]).on('change', async (path) => {
    console.log(`Change detected in ${path}`);
    await generateDocs();
    await validateDocs();
  });
}

syncDocs();
```

## Integration

### 1. Package.json Scripts
```json
{
  "scripts": {
    "docs:generate": "node .docs/scripts/generate-docs.js",
    "docs:validate": "node .docs/scripts/validate-docs.js",
    "docs:dev": "node .docs/scripts/sync-docs.js",
    "docs:build": "npm run docs:generate && npm run docs:validate && cd website && gatsby build",
    "docs:serve": "cd website && gatsby serve"
  }
}
```

### 2. CI/CD Integration
```yaml
name: Documentation

on:
  push:
    branches: [ main ]
    paths:
      - 'src/**'
      - 'docs/**'
      - 'schema.graphql'

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Generate Docs
        run: npm run docs:generate
      - name: Validate Docs
        run: npm run docs:validate
      - name: Build Website
        run: npm run docs:build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./website/public
```

## Usage Guidelines

1. Development Workflow
   - Write documentation alongside code
   - Use provided templates
   - Run local validation before commit
   - Review generated docs

2. Documentation Types
   - API Documentation (auto-generated)
   - Architecture Documentation (managed)
   - Development Guides (managed)
   - Component Documentation (auto-generated)

3. Best Practices
   - Keep documentation close to code
   - Use TypeScript for better docs
   - Include examples in documentation
   - Update diagrams with code changes

4. Maintenance
   - Regular validation runs
   - Automated updates
   - Version synchronization
   - Link checking
