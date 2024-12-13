# SpiceTime Architecture Monorepo Structure

```
spicetime-architecture/
├── packages/
│   ├── services/
│   │   ├── project-management/     # Current focus - PM service
│   │   │   ├── src/
│   │   │   │   ├── domain/
│   │   │   │   ├── infrastructure/
│   │   │   │   ├── schema/
│   │   │   │   └── utils/
│   │   │   └── docs/
│   │   ├── time-tracking/          # Future AI-driven time tracking
│   │   ├── team-formation/         # Future team optimization
│   │   ├── ethics-rating/          # Future ethics and mentorship
│   │   ├── assistant/              # Core AI assistant service
│   │   └── gateway/               # GraphQL API gateway
│   │
│   ├── cli/
│   │   ├── spm/                   # SpiceTime PM CLI
│   │   └── core/                  # Shared CLI utilities
│   │
│   ├── core/
│   │   ├── utils/                 # Shared utilities
│   │   └── types/                 # Common TypeScript types
│   │
│   └── clients/
│       ├── web/                   # Web interface
│       └── desktop/               # Desktop application
│
├── tools/
│   ├── eslint-config/            # Shared ESLint config
│   └── tsconfig/                 # Shared TypeScript config
│
├── infrastructure/
│   ├── graph-db/                 # Graph database setup
│   ├── vector-db/                # Vector database setup
│   └── nextcloud/                # NextCloud integration
│
└── docs/                         # Documentation
    ├── architecture/             # Architecture docs
    ├── development/              # Development guides
    └── deployment/               # Deployment guides

# Future Projects Structure (not yet implemented)
spicetime-pm/                     # PM Architecture Project
├── design/                       # Detailed PM design
├── core/                         # Core PM implementation
└── cli/                         # Advanced CLI implementation

spicetime-ai/                     # AI Services Project
├── time-tracking/               # Time tracking AI
├── team-formation/              # Team optimization AI
└── ethics/                      # Ethics and mentorship AI
```