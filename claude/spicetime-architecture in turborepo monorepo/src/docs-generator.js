const path = require('path');
const fs = require('fs');

/**
 * @typedef {Object} ProjectStructure
 * @property {string} name - Project name
 * @property {string} version - Project version
 * @property {Object.<string, string>} scripts - Available npm scripts
 * @property {string[]} dependencies - Project dependencies
 * @property {string} tree - Project directory tree
 */

/**
 * Reads and parses package.json file
 * @param {string} filePath - Path to package.json
 * @returns {Object|null} Parsed package.json content or null if not found
 */
function readPackageJson(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
        return null;
    }
}

/**
 * Generates directory tree structure
 * @param {string} startPath - Starting directory path
 * @param {number} [depth=0] - Current depth level
 * @param {number} [maxDepth=2] - Maximum depth to traverse
 * @returns {string} Formatted directory tree
 */
function generateDirectoryTree(startPath, depth = 0, maxDepth = 2) {
    if (depth > maxDepth) return '';
    let tree = '';
    const files = fs.readdirSync(startPath);
    
    files.forEach(file => {
        if (file.startsWith('.') || file === 'node_modules') return;
        
        const filePath = path.join(startPath, file);
        const stats = fs.statSync(filePath);
        const prefix = '│   '.repeat(depth) + (depth ? '├── ' : '');
        
        if (stats.isDirectory()) {
            tree += `${prefix}${file}/\n`;
            tree += generateDirectoryTree(filePath, depth + 1, maxDepth);
        }
    });
    
    return tree;
}

/**
 * Collects project structure information
 * @returns {ProjectStructure} Collected project information
 */
function collectProjectInfo() {
    const packageJson = readPackageJson('package.json');
    return {
        name: packageJson?.name || 'spicetime-architecture',
        version: packageJson?.version || '0.0.1',
        scripts: packageJson?.scripts || {},
        dependencies: [
            ...Object.keys(packageJson?.dependencies || {}),
            ...Object.keys(packageJson?.devDependencies || {})
        ].sort(),
        tree: generateDirectoryTree('.')
    };
}

/**
 * Generates markdown content for project guides
 * @param {ProjectStructure} projectInfo - Collected project information
 * @returns {Object.<string, string>} Object containing generated documentation
 */
function generateDocumentation(projectInfo) {
    const onboarding = `# ${projectInfo.name} Contributor Onboarding Guide

## Welcome to ${projectInfo.name}!

SpiceTime is a self-evolving distributed network of AI development agents that grow in capability through network effects. This guide will help you get started as a contributor.

## Project Structure
\`\`\`
${projectInfo.tree}
\`\`\`

## Quick Start

1. **Environment Setup**
   \`\`\`bash
   # Clone the repository
   git clone https://github.com/your-org/spicetime-architecture.git
   cd spicetime-architecture

   # Install dependencies
   pnpm install

   # Copy environment file
   cp .env.example .env
   \`\`\`

2. **Available Scripts**
   ${Object.entries(projectInfo.scripts)
        .map(([name, script]) => `- \`pnpm ${name}\`: ${script}`)
        .join('\n   ')}

## Development Guidelines

### Code Standards
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write tests for new features
- Document public APIs using JSDoc
- Keep commits focused and descriptive

### Development Workflow
1. Create a feature branch
2. Write code and tests
3. Run local verification
4. Submit pull request
5. Address review feedback

### Working with AI Agents
- Respect agent specializations
- Document agent interactions
- Follow AI ethics guidelines
- Report unexpected behaviors
- Contribute to agent learning

## Project Dependencies
${projectInfo.dependencies.map(dep => `- ${dep}`).join('\n')}

## Getting Help

1. **Documentation**
   - Read [Architecture Guide](docs/architecture/)
   - Check [API Documentation](docs/api/)
   - Review [Tutorials](docs/tutorials/)

2. **Communication**
   - Join project chat
   - Subscribe to updates
   - Follow announcements`;

    return {
        onboarding
    };
}

/**
 * Writes generated documentation to files
 * @param {Object.<string, string>} documentation - Generated documentation content
 */
function writeDocumentation(documentation) {
    // Create docs directory if it doesn't exist
    const docsDir = path.join('docs');
    if (!fs.existsSync(docsDir)) {
        fs.mkdirSync(docsDir, { recursive: true });
    }

    // Write individual documentation files
    fs.writeFileSync(path.join(docsDir, 'ONBOARDING.md'), documentation.onboarding);
}

/**
 * Main documentation generation process
 */
function main() {
    try {
        const projectInfo = collectProjectInfo();
        const documentation = generateDocumentation(projectInfo);
        writeDocumentation(documentation);
        console.log('✨ Generated project documentation successfully!');
    } catch (error) {
        console.error('Error generating documentation:', error);
        process.exit(1);
    }
}

// Execute if run directly
if (require.main === module) {
    main();
}

module.exports = {
    collectProjectInfo,
    generateDocumentation,
    writeDocumentation
};
