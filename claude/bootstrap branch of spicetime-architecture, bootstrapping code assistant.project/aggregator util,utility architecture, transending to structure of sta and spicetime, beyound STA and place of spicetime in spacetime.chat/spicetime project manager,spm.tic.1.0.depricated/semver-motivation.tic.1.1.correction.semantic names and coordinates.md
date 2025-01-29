# SpiceTime SemVer: From Semantic Names to Coordinates

## Core Insight

SpiceTime versioning provides a DNS-like service that:

1. Takes semantic names (like 'utils/aggregator')
2. Translates them to coordinates (like '3.4')
3. Uses these coordinates to locate packages in version space

This enables:

- Patches targeting semantic names
- DNS translation to precise coordinates
- Version space navigation
- Structure-agnostic modifications

## How It Works

### Package Addressing

```typescript
// Primary: Use semantic name
import { feature } from '@spicetime/v2/utils/aggregator';

// Under the hood: DNS translates to coordinates
// utils/aggregator -> 3.4
// Actual resolution: @spicetime/v2/3.4
```

### Patch Application

```typescript
// Target patch by semantic name
patch.apply('utils/aggregator', {
  content: newFeatureCode,
  type: 'feature'
});

// DNS service translates internally
// utils/aggregator -> 3.4
// Applies patch to correct coordinates in version space
```

## DNS Translation

### Name Resolution

```typescript
// DNS service maps semantic names to coordinates
const coordinates = await spm.resolveCoordinates('utils/aggregator');
console.log(coordinates); // '3.4'

// Can also reverse lookup
const semanticName = await spm.resolveName('3.4');
console.log(semanticName); // 'utils/aggregator'
```

### Structure Independence

```typescript
// Different repos can have different physical structures
// But same semantic names resolve to same coordinates

repo1/
  └── utils/
      └── aggregator/  // resolves to 3.4

repo2/
  └── features/
      └── aggregation/ // also resolves to 3.4
```

## Patch Application

### External Patches

```typescript
// Patch targets semantic name
const patch = {
  target: 'utils/aggregator',  // Natural naming
  changes: [
    { type: 'add', content: newFeature },
    { type: 'modify', content: updatedCode }
  ]
};

// SPM handles translation and application
await spm.applyPatch(patch);
// Internally: utils/aggregator -> 3.4 -> physical location
```

### Multi-Target Patches

```typescript
// Patch can target multiple semantic areas
const complexPatch = {
  targets: [
    'utils/aggregator',
    'utils/errors',
    'components/ui'
  ],
  changes: [...]
};

// SPM resolves all names to coordinates
// utils/aggregator -> 3.4
// utils/errors -> 3.5
// components/ui -> 4.2
```

## Version Space Navigation

### 1. By Semantic Names

```typescript
// Natural navigation using semantic names
const related = await spm.findRelated('utils/aggregator');
console.log(related);
// {
//   siblings: ['utils/parser', 'utils/formatter'],
//   dependencies: ['utils/errors', 'core/types']
// }
```

### 2. Coordinate Translation

```typescript
// DNS translates all names to coordinates
{
  'utils/aggregator': '3.4',
  'utils/parser': '3.5',
  'utils/formatter': '3.6',
  'utils/errors': '3.7',
  'core/types': '1.2'
}
```

## Benefits

### 1. Natural Addressing

- Use meaningful semantic names
- DNS handles coordinate translation
- Coordinates provide precise location
- Version space remains organized

### 2. Structure Independence

- Patches target semantic names
- Coordinates abstract physical location
- Structure can evolve freely
- Names remain stable

### 3. Version Control

- Major version controls package state
- Coordinates map semantic space
- Names provide natural addressing
- Evolution preserves semantics

## Practical Impact

### For Development

```typescript
// Developers use semantic names
import { feature } from '@spicetime/v2/utils/aggregator';

// Tools use coordinate space
const location = resolveCoordinates('utils/aggregator'); // 3.4
```

### For Tooling

```typescript
// External tools target semantic names
tool.modify('utils/aggregator', changes);

// SPM handles translation and location
// utils/aggregator -> 3.4 -> physical location
```

### For Structure

```typescript
// Repository structure can change
// Semantic names remain stable
// Coordinates provide consistent addressing
// DNS maintains mapping
```

## Summary

SpiceTime's versioning system:

1. Uses semantic names as primary identifiers
2. Translates names to coordinates via DNS
3. Uses coordinates for precise location
4. Maintains structure independence
5. Enables natural patch targeting

This approach combines the best of:

- Natural semantic naming
- Precise coordinate addressing
- Structure independence
- Version control integration