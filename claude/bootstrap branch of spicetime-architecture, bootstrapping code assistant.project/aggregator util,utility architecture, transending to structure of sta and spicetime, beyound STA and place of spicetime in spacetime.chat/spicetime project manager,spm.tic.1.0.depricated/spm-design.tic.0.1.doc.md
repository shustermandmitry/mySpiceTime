# SPM: SpiceTime Package Manager

## Core Philosophy

SPM treats packages as existing in a space-time continuum where:

- Space coordinates are determined by package hierarchy
- Time coordinates are version numbers
- Git maintains history
- Version numbers indicate structural position

### Package Space-Time

#### Space Coordinates

- Packages exist in a hierarchical structure
- Position is encoded in version numbers
- Children inherit parent constraints
- Siblings share same parent space

#### Time Dimension

- Major versions represent time slices
- Each slice is a complete state
- Lower versions automatically included in higher
- Git tracks actual changes

## Core Concepts

### 1. Version As Location

```
@spicetime/utils@1.2.3
            |    |
            |    +-- Coordinates in package space (2.3)
            +------- Major version (time slice) (1)
```

Version numbers have semantic meaning:

- First number: Time dimension
- Second/third: Space coordinates
- Coordinates determined by package hierarchy
- Position relative to repo root

### 2. Virtual Versioning

A package can be included in multiple versions:

- Physical package exists once
- Virtual versions reference physical
- Higher versions include lower automatically
- No duplication of code

Example:

```
utils@1.0.0/ (physical)
  ├── aggregator@1.0.0/
  └── errors@1.0.0/

utils@2.0.0/ (virtual)
  ├── aggregator@2.0.0/ (new physical)
  └── errors@1.0.0/ (reference to physical)
```

### 3. Package Resolution

Resolution happens through:

1. Git providing history
2. Graph DB providing efficient querying
3. Build tools resolving virtual packages
4. Runtime using resolved paths

## Package Structure

```
@spicetime/spm/
├── docs/
│   ├── design/          # Design documentation
│   │   ├── concepts.md  # Core concepts
│   │   ├── versions.md  # Version system
│   │   └── space.md     # Package space
│   └── user/            # User documentation
│       ├── intro.md     # Getting started
│       └── guides.md    # Usage guides
└── package.json
```

## Functionality

### 1. Package Resolution

- Resolve virtual package versions
- Map to physical locations
- Handle dependencies
- Maintain consistency

### 2. Space Management

- Track package hierarchy
- Manage coordinates
- Handle relationships
- Validate structure

### 3. Version Management

- Track time slices
- Handle version bumps
- Manage compatibility
- Control transitions

### 4. Build Integration

- Provide build tool plugins
- Handle virtual imports
- Manage resolutions
- Cache results

## Usage Patterns

### 1. Direct Usage

```typescript
import { something } from '@spicetime/utils@2/aggregator';
```

### 2. Package Definition

```json
{
  "name": "@spicetime/my-package",
  "version": "1.2.3",
  "spicetime": {
    "coordinates": {
      "x": 2,
      "y": 3
    }
  }
}
```

### 3. Version Resolution

```typescript
// All resolved at build time to physical paths
import { v1 } from '@spicetime/utils@1';
import { v2 } from '@spicetime/utils@2';
```

## Implementation Strategy

### Phase 1: Bootstrap

- Flat versions (v0)
- Git for version control
- Simple file structure
- Basic documentation

### Phase 2: Core Structure

- Package space definition
- Version mapping
- Basic resolution
- Build tool integration

### Phase 3: Advanced Features

- Graph DB integration
- Efficient querying
- Virtual packaging
- Advanced tooling

## Best Practices

### 1. Package Organization

- Clear hierarchy
- Logical grouping
- Consistent naming
- Documented structure

### 2. Version Management

- Meaningful versions
- Clear transitions
- Documented changes
- Clean upgrades

### 3. Development Flow

- Work in time slices
- Maintain compatibility
- Document transitions
- Test thoroughly

## Future Considerations

### 1. Tooling Evolution

- IDE integration
- Visualization tools
- Analysis tools
- Migration helpers

### 2. Scale Management

- Large repositories
- Many versions
- Complex hierarchies
- Performance optimization

### 3. Integration Points

- Build systems
- Development tools
- CI/CD pipelines
- Analysis tools