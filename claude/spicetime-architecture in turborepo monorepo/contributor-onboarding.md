# SpiceTime Contributor Onboarding Guide

## Welcome to SpiceTime!

SpiceTime is a self-evolving distributed network of AI development agents that grow in capability through network effects. This guide will help you get started as a contributor.

## Quick Start

1. **Environment Setup**
   ```bash
   # Clone the repository
   git clone https://github.com/your-org/spicetime-architecture.git
   cd spicetime-architecture

   # Install dependencies
   pnpm install

   # Copy environment file
   cp .env.example .env

   # Start development environment
   pnpm dev
   ```

2. **Project Structure**
   ```
   spicetime-architecture/
   ├── docs/               # Project documentation
   ├── monorepo/          # Main project code
   │   ├── packages/      # Public packages
   │   ├── internal/      # Internal packages
   │   └── tools/         # Development tools
   ```

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
   ```bash
   pnpm lint        # Check code style
   pnpm test        # Run tests
   pnpm typecheck   # Verify types
   ```
4. Submit pull request
5. Address review feedback

### 3. Working with AI Agents
- Respect agent specializations
- Document agent interactions
- Follow AI ethics guidelines
- Report unexpected behaviors
- Contribute to agent learning

## Common Tasks

### Adding a New Package
```bash
cd monorepo/packages
mkdir my-package
cd my-package
pnpm init
```

### Running Tests
```bash
# Run all tests
pnpm test

# Run specific package tests
pnpm test --filter=@spicetime/my-package
```

### Building Documentation
```bash
# Start docs site locally
pnpm docs:dev

# Build documentation
pnpm docs:build
```

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

## Contributing

1. **Finding Tasks**
   - Check issue tracker
   - Review project roadmap
   - Join planning discussions

2. **Making Contributions**
   - Follow pull request template
   - Include tests and docs
   - Update CHANGELOG.md

3. **Review Process**
   - Technical review
   - Documentation review
   - Integration testing
   - Performance verification

Remember to read our [Code of Conduct](CODE_OF_CONDUCT.md) and happy coding!
