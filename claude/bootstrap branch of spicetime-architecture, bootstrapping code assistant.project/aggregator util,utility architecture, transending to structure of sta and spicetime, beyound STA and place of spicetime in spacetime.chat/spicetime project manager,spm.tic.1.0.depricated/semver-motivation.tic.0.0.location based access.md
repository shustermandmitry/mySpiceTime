# SpiceTime SemVer: Location-Based Access

## Core Motivation

The SpiceTime versioning system reimagines package addressing by treating version numbers as coordinates in package
space. This enables precise file-level access without requiring knowledge of internal repository structure.

### Key Insight

Traditional package management requires:

- Understanding repository structure
- Knowing package locations
- Following naming conventions
- Understanding dependency trees

SpiceTime coordinates eliminate this by providing:

- Direct location-based access
- Structure-agnostic addressing
- Precise file targeting
- Semantic positioning

## Location-Based Access

### Standard Package Access

```typescript
// Traditional approach requires knowledge of structure
import { something } from '@org/domain/subdomain/feature/specific/path';

// And version resolution is ambiguous
import { something } from '@org/package@^2.3.4';
```

### Coordinate-Based Access

```typescript
// SpiceTime uses coordinates for precise location
import { something } from '@spicetime/2.3.4';
// Maps to exact location regardless of internal structure
// Major version: 2
// X coordinate: 3
// Y coordinate: 4
```

## Structure Abstraction

### Traditional Structure

```
repo/
├── packages/
│   ├── domain1/
│   │   └── package1/
│   └── domain2/
│       └── package2/
└── ... (need to know this structure)
```

### SpiceTime Access

```
// Don't need to know structure, just coordinates
1.2.3 -> exact file location
│ │ │
│ │ └─ Y position in space
│ └─── X position in space
└───── Version in time

// SPM resolves coordinates to actual location
```

## Benefits

### 1. Structure Independence

- Access files without knowing paths
- Repository structure can change
- Coordinates remain stable
- Location is semantic

### 2. Precise Targeting

```typescript
// Target exact functionality through coordinates
import { feature } from '@spicetime/1.2.3';
// Always gets the same feature at same coordinates
// Regardless of repository structure
```

### 3. Clone Independence

```typescript
// Same coordinates work across all clones
const clone1 = '@company1/spicetime-architecture';
const clone2 = '@company2/spicetime-architecture';

// This works the same in both:
import { thing } from '@company1/1.2.3';
import { thing } from '@company2/1.2.3';
```

## Real-World Application

### File Access Example

```typescript
// Instead of knowing full path:
import { util } from '@spicetime/utils/aggregator/fs/specific/file';

// Just use coordinates:
import { util } from '@spicetime/1.2.1';
// SPM resolves to exact file location
```

### Repository Changes

```typescript
// Original structure
spicetime/
└── utils/
    └── aggregator/
        └── feature

// New structure
spicetime/
└── packages/
    └── utils/
        └── features/
            └── aggregator/
                └── feature

// Same coordinate access works for both:
import { feature } from '@spicetime/1.2.3';
```

## Architecture Independence

### Different Organizations

```typescript
// Company A's structure
companyA/
└── custom/
    └── layout/
        └── features/

// Company B's structure
companyB/
└── src/
    └── modules/
        └── features/

// Same coordinate access:
import { feature } from '@company/1.2.3';
```

### Version Control Integration

```typescript
// Git tracks physical changes
commit: "Update feature implementation"

// But access remains coordinate-based
import { feature } from '@spicetime/1.2.3';
// SPM resolves to new implementation
```

## Future Extensions

### 1. Dynamic Resolution

```typescript
// Future capability - dynamic coordinate resolution
const location = await spm.resolve('1.2.3');
// Returns physical location for current clone
```

### 2. Semantic Mapping

```typescript
// Map functionality to coordinates
const coordinates = await spm.locateFeature('fileProcessing');
// Returns coordinates where feature lives
```

### 3. Structure Analysis

```typescript
// Analyze repository structure
const space = await spm.analyzeSpace();
// Returns coordinate map of functionality
```

## Practical Impact

### For Developers

- No need to learn repository structure
- Direct access to needed functionality
- Stable imports across changes
- Clear feature location

### For Tools

- Structure-agnostic processing
- Stable addressing
- Precise targeting
- Version clarity

### For Organizations

- Flexible repository structure
- Clear feature organization
- Easy refactoring
- Structure independence

## Summary

SpiceTime's coordinate-based versioning:

1. Enables precise file access without structure knowledge
2. Provides stable addressing across repository changes
3. Works consistently across different clones
4. Makes repository structure flexible
5. Simplifies dependency management

This fundamental shift in package addressing creates a more robust, flexible, and maintainable system for large-scale
development.