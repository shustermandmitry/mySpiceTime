const fs = require('fs');
const path = require('path');

// Helper functions
function readPackageJson(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
        return null;
    }
}

function findScripts(packageJson) {
    return packageJson?.scripts || {};
}

function findDependencies(packageJson) {
    const deps = { ...packageJson?.dependencies, ...packageJson?.devDependencies };
    return Object.keys(deps).sort();
}

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

function generateOnboarding() {
    const rootPackageJson = readPackageJson('package.json');
    const scripts = findScripts(rootPackageJson);
    const dependencies = findDependencies(rootPackageJson);
    const directoryStructure = generateDirectoryTree('.');

    const onboardingContent = `# SpiceTime Contributor Onboarding Guide

## Welcome to SpiceTime!

SpiceTime is a self-evolving distributed network of AI development agents that grow in capability through network effects. This guide will help you get started as a contributor.

## Project Structure
\`\`\`
${directoryStructure}
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

   # Start development environment
   pnpm dev
   \`\`\`

2. **Available Scripts**
   ${Object.entries(scripts).map(([name, script]) => `- \`pnpm ${name}\`: ${script}`).join('\n   ')}

## Development Guidelines

### 1. Code Standards
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write tests for new features
- Document public APIs
- Keep commits focused and descriptive

### 2. Development Workflow
1. Create a feature branch
2. Write code and tests
3. Run local verification:
   \`\`\`bash
   pnpm lint        # Check code style
   pnpm test        # Run tests
   pnpm typecheck   # Verify types
   \`\`\`
4. Submit pull request
5. Address review feedback

### 3. Working with AI Agents
- Respect agent specializations
- Document agent interactions
- Follow AI ethics guidelines
- Report unexpected behaviors
- Contribute to agent learning

## Dependencies
${dependencies.map(dep => `- ${dep}`).join('\n')}

## Getting Help

1. **Documentation**
   - Read [Architecture Guide](docs/architecture/)
   - Check [API Documentation](docs/api/)
   - Review [Tutorials](docs/tutorials/)

2. **Communication**
   - Join project chat
   - Subscribe to updates
   - Follow announcements

3. **Support**
   - Open issues for bugs
   - Discuss features in forums
   - Contact maintainers

Remember to read our [Code of Conduct](CODE_OF_CONDUCT.md) and happy coding!`;

    return onboardingContent;
}

// Create docs directory if it doesn't exist
const docsDir = path.join('docs');
if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
}

// Generate and write onboarding documentation
const onboardingContent = generateOnboarding();
fs.writeFileSync(path.join(docsDir, 'ONBOARDING.md'), onboardingContent);

console.log('✨ Generated onboarding documentation successfully!');
