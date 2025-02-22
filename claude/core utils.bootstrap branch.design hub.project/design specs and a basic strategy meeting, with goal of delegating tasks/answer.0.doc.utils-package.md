# Utils Package Architecture

## Core Structure

```
packages/utils/
├── package.json      # Package metadata + domain/space info
├── tsconfig.json     # TypeScript configuration
└── core/            # Core utilities
    ├── st-error/    # Error domain foundation
    ├── sta-scripts/ # Repository navigation
    ├── sta-package-builder/  # Template management
    ├── aggregator/  # Structure collection
    └── patcher/     # Structure application
```

## Package Configuration

```json
{
  "name": "@sta/utils",
  "version": "0.0.0",
  "private": "true",
  "info": {
    "staVirtualVersion": "0.0.0",
    "spaces": {
      "visualization layer": {
        "location": [
          0,
          0
        ]
      }
    },
    "domains": {
      "sta-cli": {
        "parent": "",
        "isRoot": "true"
      },
      "utils": {
        "isRoot": "true"
      }
    }
  }
}
```

## Domain Architecture

### Package Organization

- Package is the smallest organizational unit
- Each package contains info object in package.json
- Info object evolves additively through versions
- Multiple hierarchical domain membership per package
- Domain hierarchies independent of folder structure

### Spatial Representation

- Custom representation spaces for packages
- React component variants per domain
- Package type determined by parent domain
- Multiple spaces per package (visualization, process stages)
- 3D visualization with 2D stage slices for clarity

## Core Package Structure

Each utility maintains flat organization:

```
core/<util>/
├── <util>.ts           # Core implementation
├── <util>-STError.ts     # Error domain
├── <util>-test.ts      # Test suite
├── <util>-types.ts     # Type definitions
└── docs/
    └── <util>.doc.ts   # Documentation
```

## Implementation Protocols

### Import Pattern

```typescript
// Direct imports from package paths
import {STError} from '@sta/utils/core/st-error';
import {getSTARoot} from '@sta/utils/core/sta-scripts';
```

### Error Management

- All errors extend STError base class
- Error file pattern: `<util>-STError.ts`
- Domain-specific error boundaries

### Core Utils Summary

1. st-error
    - Error domain foundation
    - STError base class
    - Error type factory

2. sta-scripts
    - Repository navigation
    - Package information
    - Path resolution

3. sta-package-builder
    - Template management
    - Package scaffolding
    - Domain inheritance

4. aggregator + patcher
    - Structure manipulation
    - Pattern matching
    - Path resolution

## Build Constraints

- No index bundling
- Direct imports only
- Package-level error boundaries
- Documentation in dedicated files
- Flat folder structure within packages

## Version Management

- Internal package versions in staVirtualVersion
- No explicit internal dependencies needed
- Version resolution through utils package
- Correct version access through imports