# SpiceTime SemVer: Semantic Discovery and Structure Independence

## Core Insight

SpiceTime versioning separates two key concerns:

1. Virtual package location (major version)
2. Semantic positioning (x.y coordinates)

This separation enables:

- Structure-agnostic package access
- Semantic package discovery
- Self-describing repositories
- Structure-independent patching

## Version Number Components

```
2.3.4
│ │ │
│ └─┴─ Semantic coordinates for querying/discovery
└───── Virtual package version (actual location)
```

## Package Access Patterns

### Traditional (Path-Dependent)

```typescript
// Requires knowledge of folder structure
import { feature } from '@spicetime/utils/aggregator/specific/path';
```

### Version-Based (Structure-Agnostic)

```typescript
// Uses only virtual package version
import { feature } from '@spicetime/v2/utils/aggregator';
```

### Coordinate-Based Discovery

```typescript
// Query package location by semantic coordinates
const packagePath = await spm.resolve('3.4');  // Returns 'utils/aggregator'
import { feature } from `@spicetime/v2/${packagePath}`;
```

## Structure Patching

### Traditional Patching

```patch
--- a/utils/aggregator/feature.ts
+++ b/utils/aggregator/feature.ts
// Requires exact path knowledge
```

### Coordinate-Based Patching

```typescript
// Patch targets semantic coordinates
patch.apply('3.4', {
  content: newFeatureCode,
  type: 'feature'
});
// SPM resolves to correct location regardless of structure
```

## Semantic Repository

### Package Discovery

```typescript
// Find package by domain position
const errorHandler = await spm.query('3.4');
// Returns package info at those coordinates
console.log(errorHandler);
// {
//   path: 'utils/errors',
//   type: 'error-handling',
//   capabilities: ['...']
// }
```

### Structure Mapping

```typescript
// Map semantic space to physical structure
const repoMap = await spm.mapStructure();
// {
//   '3.4': { path: 'utils/errors', type: 'core' },
//   '3.5': { path: 'utils/aggregator', type: 'feature' }
// }
```

## External Integration

### Structure-Agnostic Patches

```typescript
// External patch targeting semantic position
const patch = {
  coordinates: '3.4',
  changes: [
    { type: 'add', content: newFeature },
    { type: 'modify', content: updatedCode }
  ]
};

// Apply regardless of local structure
await spm.applyPatch(patch);
```

### Package Installation

```typescript
// Install by semantic position
await spm.install({
  coordinates: '3.4',
  package: externalPackage
});
// SPM determines correct location in local structure
```

## Self-Modifying Capabilities

### Structure Evolution

```typescript
// Repository can reorganize while maintaining semantic map
await spm.restructure({
  '3.4': { newPath: 'core/error-handling' },
  '3.5': { newPath: 'features/aggregation' }
});

// All imports and patches continue working
import { feature } from '@spicetime/v2/core/error-handling';
// or
const path = await spm.resolve('3.4');
import { feature } from `@spicetime/v2/${path}`;
```

### AI Integration

```typescript
// AI can understand repository through semantic coordinates
const analysis = await spm.analyzeSpace();
// {
//   '3.4': { purpose: 'error handling', dependencies: [...] },
//   '3.5': { purpose: 'data aggregation', consumers: [...] }
// }

// AI can suggest and apply structural improvements
const suggestion = await ai.suggestRestructure(analysis);
await spm.applyRestructure(suggestion);
```

## Key Benefits

### 1. Structure Independence

- Packages addressable by version and coordinates
- Physical structure can evolve freely
- Semantic meaning preserved
- External tools remain functional

### 2. Self-Description

- Repository describes its own structure
- Semantic positions queryable
- Package purposes discoverable
- Dependencies mappable

### 3. External Integration

- Patches target semantic positions
- Structure changes don't break integrations
- Tools work across different structures
- AI can understand and modify repository

### 4. Future Evolution

- Structure can be optimized
- Semantics can be refined
- New capabilities added
- External tools adapted

## Summary

SpiceTime's versioning system creates:

1. Structure-agnostic package addressing
2. Semantic discovery through coordinates
3. Self-describing repositories
4. Structure-independent patch application
5. Platform for AI-driven evolution

This enables repositories to evolve and be modified while maintaining semantic meaning and external tool compatibility.