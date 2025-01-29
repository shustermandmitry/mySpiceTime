# SPM: Scope and Boundaries

## What SPM Is

SPM is an internal package organization system specifically for spicetime-architecture monorepo:

- Manages internal package relationships
- Provides semantic coordinate system
- Enables structure-agnostic access
- Handles internal versioning

## What SPM Is Not

SPM is not:

- A replacement for npm
- A general package manager
- A dependency resolution system
- A publishing platform

## Package Independence

### Internal Packages

```typescript
// Inside spicetime-architecture
import { something } from '@spicetime/v2/utils/aggregator';
// Uses SPM coordinate system and versioning
```

### Independent Packages

When a package needs to be independent:

1. Move to separate repository
2. Use standard npm versioning
3. Add spicetime-architecture as dependency
4. Use normal npm workflows

```json
// Independent package package.json
{
  "name": "my-independent-package",
  "version": "1.2.3",  // Standard semver
  "dependencies": {
    "spicetime-architecture": "^2.0.0"  // Single dependency
  }
}
```

## Use Case Examples

### Internal Package

```yaml
# Part of spicetime-architecture
name: AggregatorComponent
version: 2.3.4  # Uses SPM coordinates
type: component
# Managed by SPM
```

### Independent Package

```yaml
# Separate repository
name: MyFeature
version: 1.2.3  # Standard npm semver
dependencies:
  spicetime-architecture: "^2.0.0"
# Standard npm package
```

## Migration Path

### From Internal to Independent

1. Extract package to new repo
2. Convert to standard npm versioning
3. Add spicetime-architecture dependency
4. Update imports to use npm package

```bash
# Create independent package
mkdir my-feature
cd my-feature
npm init

# Add spicetime-architecture
npm install spicetime-architecture

# Ready for npm ecosystem
npm publish
```

## Best Practices

### When to Stay Internal

- Core utilities
- Shared components
- System features
- Infrastructure code

### When to Go Independent

- Standalone features
- Public packages
- Client-specific code
- Specialized tools

## Summary

SPM is:
✓ Internal organization system
✓ Coordinate-based access
✓ Structure management
✓ Version control for internal packages

SPM is not:
✗ npm replacement
✗ External package manager
✗ Publishing platform
✗ Dependency resolver

Packages can:

- Live inside spicetime-architecture using SPM
- Move to independence using standard npm
- Use spicetime-architecture as a dependency
- Participate in normal npm ecosystem