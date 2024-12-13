# SpiceTime PM Project Structure

```
spicetime-pm/
├── packages/
│   ├── schema/                   # Clean PM domain schema
│   │   ├── src/
│   │   │   ├── types/           # Core PM types
│   │   │   ├── graphql/         # GraphQL schema
│   │   │   └── validation/      # Schema validation
│   │   └── docs/
│   │
│   ├── runtime/                  # PM Runtime (evolves to SpiceTime Runtime)
│   │   ├── src/
│   │   │   ├── core/            # Runtime core
│   │   │   ├── networks/        # Network adapters
│   │   │   ├── state/           # State management
│   │   │   └── events/          # Event system
│   │   └── docs/
│   │
│   ├── api/                      # PM API implementation
│   │   ├── src/
│   │   │   ├── resolvers/       # GraphQL resolvers
│   │   │   ├── services/        # Business logic
│   │   │   └── adapters/        # Runtime integration
│   │   └── docs/
│   │
│   └── cli/                      # PM CLI
│       ├── src/
│       └── docs/
│
├── tools/                        # Development tools
│   ├── testing/
│   └── deployment/
│
└── docs/                         # Documentation
    ├── runtime/                  # Runtime documentation
    ├── schema/                   # Schema documentation
    └── deployment/               # Deployment guides
```

## Key Points
1. Schema package is runtime-agnostic
2. Runtime evolves naturally from PM needs
3. API adapts schema to runtime
4. Clean separation of concerns

## Package Responsibilities

### Schema
- Defines PM domain model
- Maintains runtime independence
- Focuses on PM concepts
- Provides validation rules

### Runtime
- Implements distributed operations
- Manages network interactions
- Handles state and events
- Evolves with PM needs

### API
- Implements GraphQL API
- Bridges schema and runtime
- Maintains clean boundaries
- Handles business logic

### CLI
- Provides user interface
- Implements PM workflows
- Uses API abstractions
- Maintains simplicity