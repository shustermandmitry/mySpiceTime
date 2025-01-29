# SpiceTime Coordinate System: SemVer as Location

## Core Concept

In SpiceTime, version numbers aren't just about time - they're coordinates in space:

```
@spicetime/utils@1.2.3
                 │ │ │
                 │ └─┴── Space coordinates (2.3)
                 └────── Time dimension (1)
```

### Key Principles

1. **Version as Location**
    - Major version = Time dimension
    - Minor.Patch = Space coordinates
    - Position relative to repo root
    - Clear structural relationships

2. **Navigational Context**
    - Every package knows its location
    - Relationships defined by coordinates
    - Clear parent-child connections
    - Precise dependency paths

## Coordinate System Rules

### 1. Space Coordinates (Minor.Patch)

```
Root Package: 0.0
└── Level 1: 1.0
    ├── Level 2A: 1.1
    │   └── Level 3A: 1.1.1
    └── Level 2B: 1.2
        └── Level 3B: 1.2.1
```

- Minor number: Primary nesting level
- Patch number: Position within level
- Each level adds coordinate precision
- Maximum nesting depth: 3 levels

### 2. Time Dimension (Major)

```
Timeline:
1.0.0 ──► 2.0.0 ──► 3.0.0
  │         │         │
  │         │         └── Future structure
  │         └── Evolved structure
  └── Initial structure
```

- Major version changes mark time slices
- All packages move forward together
- Maintains structural relationships
- Preserves coordinate meaning

## Navigation Through Space

### 1. Relative Navigation

```typescript
// Current package at 1.2.3
import { feature } from '../sibling';    // Goes to 1.2.0
import { util } from './local';          // Stays at 1.2.3
import { core } from '../../root';       // Goes to 1.0.0
```

### 2. Absolute Navigation

```typescript
// From anywhere in the repo
import { feature } from '@spicetime/root';          // 1.0.0
import { util } from '@spicetime/utils';            // 1.2.0
import { helper } from '@spicetime/utils/helper';   // 1.2.1
```

## SPM (SpiceTime Package Manager)

### 1. Core Responsibilities

```typescript
class SPM {
  // Resolve package coordinates
  resolveCoordinates(path: string): string {
    // Returns space-time coordinates
  }
  
  // Navigate between packages
  navigateTo(from: string, to: string): string {
    // Returns valid import path
  }
  
  // Validate package structure
  validateStructure(pkg: Package): boolean {
    // Ensures coordinate rules followed
  }
}
```

### 2. Package Resolution

```typescript
// Package lookup strategies
const strategies = {
  // Direct coordinate lookup
  absolute: (coordinates: string) => {
    return `/packages/${coordinates}`;
  },
  
  // Relative coordinate calculation
  relative: (from: string, to: string) => {
    return calculateRelativePath(from, to);
  },
  
  // Workspace-aware resolution
  workspace: (coordinates: string) => {
    return resolveInWorkspace(coordinates);
  }
};
```

## Best Practices

### 1. Package Organization

```
monorepo/
├── packages/
│   ├── root@1.0.0/           # Core package
│   ├── utils@1.2.0/          # Utilities
│   │   ├── array@1.2.1/      # Array utils
│   │   └── string@1.2.2/     # String utils
│   └── components@1.3.0/     # Components
│       ├── core@1.3.1/       # Core components
│       └── forms@1.3.2/      # Form components
```

### 2. Import Patterns

```typescript
// Prefer relative imports within same coordinate space
import { feature } from './feature';

// Use absolute imports across coordinate spaces
import { util } from '@spicetime/utils';

// Be explicit with sub-package imports
import { helper } from '@spicetime/utils/helper';
```

### 3. Version Management

```json
{
  "name": "@spicetime/utils",
  "version": "1.2.0",
  "spicetime": {
    "coordinates": {
      "major": 1,
      "minor": 2,
      "patch": 0
    }
  }
}
```

## Real-World Examples

### 1. Feature Development

```typescript
// Working on new feature in utils/array
const currentCoordinates = '1.2.1';

// Import from parent package
import { base } from '@spicetime/utils';  // 1.2.0

// Import from sibling
import { format } from '../string';       // 1.2.2

// Import from root
import { core } from '@spicetime/root';   // 1.0.0
```

### 2. Component Composition

```typescript
// Building form in components/forms (1.3.2)
import { Button } from '../core';         // 1.3.1
import { validate } from '@spicetime/utils/string'; // 1.2.2
import { Theme } from '@spicetime/root';  // 1.0.0

// Component inherits coordinate context
const Form = () => {
  // Composed at 1.3.2
};
```

## Implementation Details

### 1. Coordinate Resolution

```typescript
function resolveCoordinates(pkg: Package): string {
  const { major, minor, patch } = pkg.spicetime.coordinates;
  
  // Validate coordinates
  validateCoordinates(major, minor, patch);
  
  // Format as coordinate string
  return `${major}.${minor}.${patch}`;
}
```

### 2. Path Navigation

```typescript
function calculateRelativePath(from: string, to: string): string {
  const fromCoords = parseCoordinates(from);
  const toCoords = parseCoordinates(to);
  
  // Calculate relative path based on coordinate difference
  return buildRelativePath(fromCoords, toCoords);
}
```

### 3. Structure Validation

```typescript
function validateStructure(pkg: Package): boolean {
  // Check coordinate rules
  if (!isValidCoordinates(pkg.coordinates)) {
    return false;
  }
  
  // Verify parent-child relationships
  if (!isValidHierarchy(pkg)) {
    return false;
  }
  
  // Ensure max depth not exceeded
  if (exceedsMaxDepth(pkg)) {
    return false;
  }
  
  return true;
}
```

## Future Considerations

### 1. Tool Integration

- IDE navigation support
- Build tool optimization
- Dependency analysis
- Refactoring tools

### 2. Scale Management

- Large monorepo support
- Performance optimization
- Caching strategies
- Lazy loading

### 3. Developer Experience

- Better visualization
- Navigation helpers
- Import suggestions
- Structure validation