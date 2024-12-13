# SpiceTime Documentation Organization

## Directory Structure

```
spicetime-architecture/
├── docs/                           # Project-level documentation
│   ├── architecture/              # Architectural decision records and diagrams
│   ├── contributing/             # Contribution guidelines and workflows
│   └── infrastructure/          # Infrastructure and deployment docs
│
├── packages/
│   ├── services/
│   │   ├── api/
│   │   │   ├── docs/           # API service specific documentation
│   │   │   │   ├── api/       # API endpoints documentation
│   │   │   │   ├── schemas/   # Data model documentation
│   │   │   │   └── guides/    # Integration guides
│   │   │   └── src/
│   │   │
│   │   └── auth/
│   │       ├── docs/          # Auth service documentation
│   │       │   ├── flows/    # Authentication flows
│   │       │   └── guides/   # Integration guides
│   │       └── src/
│   │
│   └── clients/
│       ├── web/
│       │   ├── docs/         # Web client documentation
│       │   │   ├── components/  # Component documentation
│       │   │   └── hooks/      # Custom hooks documentation
│       │   └── src/
│       │
│       └── admin/
│           ├── docs/        # Admin client documentation
│           │   ├── features/  # Feature documentation
│           │   └── ui/       # UI component documentation
│           └── src/
│
├── internal/
│   ├── core/
│   │   ├── docs/           # Core utilities documentation
│   │   │   ├── apis/     # Internal APIs
│   │   │   └── utils/    # Utilities documentation
│   │   └── src/
│   │
│   └── graphql/
│       ├── docs/          # GraphQL documentation
│       │   ├── schema/   # Schema documentation
│       │   └── types/    # Type documentation
│       └── src/
│
└── tools/
    ├── eslint-config/
    │   ├── docs/         # ESLint configuration documentation
    │   └── src/
    │
    └── tsconfig/
        ├── docs/         # TypeScript configuration documentation
        └── src/
```

## Documentation Types

1. **Service Documentation** (`packages/services/*/docs/`)
   - API endpoints
   - Data models
   - Service-specific guides
   - Integration examples

2. **Client Documentation** (`packages/clients/*/docs/`)
   - Component documentation
   - Hook documentation
   - State management
   - UI patterns

3. **Internal Documentation** (`internal/*/docs/`)
   - Core utilities
   - Shared modules
   - Internal APIs
   - Common patterns

4. **Tool Documentation** (`tools/*/docs/`)
   - Configuration guides
   - Usage examples
   - Best practices

5. **Project Documentation** (`/docs/`)
   - Architecture decisions
   - Infrastructure setup
   - Development workflows
   - Contribution guidelines

## Integration with Code

Each documentation folder should contain:

1. **README.md** - Overview and quick start
2. **CONTRIBUTING.md** - Component-specific guidelines
3. **CHANGELOG.md** - Changes and versions
4. **API.md** - API documentation
5. **ARCHITECTURE.md** - Design decisions

For example:

```
packages/services/api/docs/
├── README.md                    # Service overview
├── ARCHITECTURE.md              # Service architecture
├── api/
│   ├── endpoints.md            # API endpoints documentation
│   └── authentication.md       # Authentication documentation
├── schemas/
│   ├── users.md               # User schema documentation
│   └── products.md            # Product schema documentation
└── guides/
    ├── getting-started.md     # Getting started guide
    └── integration.md         # Integration guide
```

## Documentation Standards

1. **Code Documentation**
   ```typescript
   // In source files
   /**
    * @packageDocumentation
    * @module ApiService
    */
   
   /**
    * @class ApiService
    * @description Main API service implementation
    * @see {@link /docs/api/service.md}
    */
   ```

2. **Component Documentation**
   ```typescript
   // In component files
   /**
    * @component Button
    * @description Primary button component
    * @see {@link /docs/components/button.md}
    */
   ```

3. **Test Documentation**
   ```typescript
   // In test files
   /**
    * @group unit
    * @description Button component tests
    * @see {@link /docs/testing/components.md}
    */
   ```

## Documentation Automation

1. **Generate API Documentation**
   ```bash
   # Generates API documentation in the service's docs folder
   npm run docs:generate --workspace=@spicetime/api
   ```

2. **Generate Component Documentation**
   ```bash
   # Generates component documentation in the client's docs folder
   npm run docs:generate --workspace=@spicetime/web
   ```

3. **Validate Documentation**
   ```bash
   # Validates documentation in a specific package
   npm run docs:validate --workspace=@spicetime/api
   ```

## Maintenance Workflows

1. **Update Service Documentation**
   ```bash
   cd packages/services/api
   npm run docs:update
   ```

2. **Update Client Documentation**
   ```bash
   cd packages/clients/web
   npm run docs:update
   ```

3. **Update Project Documentation**
   ```bash
   npm run docs:update:all
   ```

Would you like me to provide more details about any specific part of this documentation structure or create the setup scripts to implement this organization?