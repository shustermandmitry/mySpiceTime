# Spicetime Architecture Setup

## Directory Structure
```
spicetime-architecture/
├── docs/
│   ├── architecture/
│   └── api/
├── monorepo/
│   ├── packages/
│   │   ├── services/
│   │   │   ├── api/        # Main API/Gateway service
│   │   │   └── auth/       # Auth service
│   │   └── clients/
│   │       ├── web/        # Web client
│   │       └── admin/      # Admin dashboard
│   ├── internal/
│   │   ├── core/
│   │   │   ├── utils/     # Shared utilities
│   │   │   └── config/    # Shared configurations
│   │   └── graphql/
│   │       ├── schema/    # Shared GraphQL schema
│   │       └── types/     # Generated types
│   └── tools/
│       ├── eslint-config/
│       ├── tsconfig/
│       └── vite-config/
```

## Key Technologies
- Package Manager: PNPM
- Monorepo Tool: Turborepo
- Build Tool: Vite
- Testing: Vitest
- TypeScript for type safety
- GraphQL for API communication
- React for client applications

## Core Configurations

### 1. PNPM Workspace
```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/services/*'
  - 'packages/clients/*'
  - 'internal/**/*'
  - 'tools/*'
```

### 2. Turborepo
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "test": {
      "dependsOn": ["build"]
    },
    "lint": {}
  }
}
```

### 3. Vite Configuration
- Base configuration for web applications
- Library configuration for shared packages
- Test configuration with Vitest
- Asset handling and optimization
- Development server setup

### 4. Development Tools
- ESLint for code linting
- Prettier for code formatting
- TypeScript configurations
- Git hooks with Husky
- Lint-staged for pre-commit checks

## Key Features Implemented

### 1. Build System
- Fast development with Vite
- Efficient builds with Turborepo caching
- Shared configurations
- Asset optimization
- Code splitting

### 2. Development Experience
- Hot Module Replacement
- TypeScript integration
- Path aliases
- Source maps
- Development proxy setup

### 3. Testing Setup
- Vitest configuration
- React Testing Library integration
- Coverage reporting
- Test utilities and helpers

## Common Commands

```bash
# Installation
pnpm install

# Development
pnpm dev                    # Run all dev servers
pnpm dev --filter=@spicetime/web  # Run specific app

# Building
pnpm build                  # Build everything
pnpm build --filter=@spicetime/web...  # Build specific app and dependencies

# Testing
pnpm test
pnpm test:coverage

# Linting
pnpm lint
pnpm lint:fix
```

## Next Steps and Considerations

1. GraphQL Setup
   - Schema sharing between services
   - Code generation setup
   - API Gateway implementation

2. Authentication
   - Auth service setup
   - JWT implementation
   - Session management

3. Development Infrastructure
   - CI/CD setup
   - Docker configuration
   - Environment management

4. Deployment
   - Production build optimization
   - Container orchestration
   - Cloud infrastructure setup

## Best Practices Implemented

1. Code Organization
   - Clear separation of concerns
   - Shared code in internal packages
   - Consistent directory structure

2. Development Workflow
   - Standardized coding style
   - Automated quality checks
   - Efficient build process

3. Testing Strategy
   - Unit testing setup
   - Integration testing capability
   - Coverage reporting

4. Performance Optimization
   - Code splitting
   - Tree shaking
   - Asset optimization
   - Cache management

## Common Workflows

### Adding a New Package
```bash
cd packages/services
mkdir new-service
cd new-service
pnpm init
# Add dependencies
pnpm add dependency-name
```

### Sharing Code
- Use internal packages for shared code
- Import from shared packages using workspace protocol
- Maintain proper dependency management in package.json

### Development Process
1. Run development servers
2. Make changes
3. Tests pass locally
4. Commit (triggers hooks)
5. Build and verify
6. Push changes

This setup provides a solid foundation for scaling the application while maintaining good development practices and performance.
