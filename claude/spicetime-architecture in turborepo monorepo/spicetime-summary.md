# Spicetime Architecture Setup

## Directory Structure
```
spicetime-architecture/
├── docs/
│   ├── architecture/
│   └── api/
├── monorepo/
│   ├── core/               # Core system components
│   │   ├── runtime/       # RTOS runtime
│   │   ├── rpc/          # RPC system
│   │   ├── db/           # Database core
│   │   └── security/     # Security system
│   ├── packages/
│   │   ├── services/     # Business services
│   │   └── clients/      # Client applications
│   ├── internal/
│   │   ├── core/
│   │   │   ├── utils/
│   │   │   └── config/
│   │   └── graphql/
│   │       ├── schema/
│   │       └── types/
│   └── tools/
│       ├── eslint-config/
│       ├── tsconfig/
│       └── vite-config/
```

## Key Technologies
- Package Manager: PNPM (>=9.14.4)
- Monorepo Tool: Turborepo
- Build Tool: Vite
- Testing: Vitest
- TypeScript for type safety
- GraphQL for API communication
- React for client applications

## Core Configurations

### 1. PNPM Workspace
```yaml
packages:
  - 'monorepo/core/runtime/*'
  - 'monorepo/core/*'
  - 'monorepo/packages/services/*'
  - 'monorepo/packages/clients/*'
  - 'monorepo/internal/**/*'
  - 'monorepo/tools/*'
```

### 2. Turborepo
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"],
      "inputs": ["src/**/*.{js,jsx,ts,tsx}", "test/**/*.{js,jsx,ts,tsx}"]
    }
  }
}
```

### 3. Development Tools
- ESLint for code linting
- Prettier for code formatting
- TypeScript configurations
- Git hooks with Husky
- Lint-staged for pre-commit checks

## Docker Setup

### Development Environment
- Hot reloading enabled
- Source mounted from host
- Dependencies in container
- Development server on port 3000

### Test Environment
Three modes:
1. Full Suite: Complete test run
2. Watch Mode: Development testing
3. Debug Mode: Integrated debugging

### WebStorm Integration
- Docker configurations in `.idea/runConfigurations/`
- Integrated debugging support
- Container management through IDE
- Build/run configurations for different environments

## Git Hooks (Husky)

Pre-commit:
- Lint-staged for code quality
- Prettier formatting
- TypeScript checking

Pre-push:
- Run tests
- Coverage checks

Commit message:
- Conventional commits format

## Common Commands

```bash
# Development
docker compose -f docker-compose.dev.yml up

# Testing
docker compose -f docker-compose.test.yml --profile all up    # Full suite
docker compose -f docker-compose.test.yml --profile watch up  # Watch mode
docker compose -f docker-compose.test.yml --profile debug up  # Debug mode

# Bundle Analysis
ANALYZE=true pnpm build
```

## Next Steps
1. GraphQL Setup
   - Schema sharing between services
   - Code generation setup
   - API Gateway implementation

2. Core Services Setup
   - RTOS service
   - Authentication service
   - Database services

3. Client Applications
   - Web client
   - Mobile adaptations
   - Desktop client

4. Production Environment
   - Multi-stage builds
   - Security hardening
   - Performance optimization
