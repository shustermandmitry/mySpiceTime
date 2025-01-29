File: docs/concepts/universal-pattern/phase-transitions.md

# Phase Transitions: How New Structures Emerge

## Package State Transitions

A package transitions between states as tracked in SpiceTime Architecture:

```typescript
// State record in package.json
{
  "spicetime": {
    "packages": {
      "@spicetime/utils": {
        "coordinates": "11.3.4",
        "state": "virtual",     // Initial state
        "virtual": true
      }
    }
  }
}

// After development and testing
{
  "spicetime": {
    "packages": {
      "@spicetime/utils": {
        "coordinates": "11.3.4",
        "state": "stable",      // Transitioned state
        "virtual": false
      }
    }
  }
}
```

## Structure Emergence

New structures crystallize through component composition:

```tsx
// STARepo inherits from STRepo
class STARepo extends STRepo {
  // Specialized for SpiceTime Architecture
}

// Initial exploration
<STARepo 
  coordinates="11.0.0"
  name="spicetime-architecture">
  {/* Structure undefined */}
</STARepo>

// Pattern emerges
<STARepo 
  coordinates="11.0.0" 
  name="spicetime-architecture">
  <Package name="utils" coordinates="11.3.4">
    <Feature name="collection" />
    <Feature name="filtering" />
  </Package>
</STARepo>
```

## Coordinate Crystallization

Package positions solidify based on relationships:

```typescript
interface CoordinateSpace {
  major: number;      // Time dimension (11)
  domain: number;     // Primary grouping (3)
  position: number;   // Specific location (4)
}

// In graph database
{
  node: "@spicetime/utils",
  coordinates: "11.3.4",
  relationships: [
    {
      type: "parent",
      target: "spicetime-architecture@11"
    },
    {
      type: "sibling",
      target: "@spicetime/components@11.5"
    }
  ]
}
```

## Virtual Phase Freedom

During the virtual phase, developers have complete freedom to explore:

```typescript
// Developer's private exploration space
interface VirtualPhase {
  // Free to rename
  rename: (oldName: string, newName: string) => void;
  
  // Free to move in structure
  move: (component: string, newCoordinates: string) => void;
  
  // Free to reorganize
  restructure: (newStructure: Structure) => void;
  
  // Private history - only final state matters
  transitions: private[];
}

// Once reality point is created
interface StablePhase {
  // Only extensions allowed
  extend: (newFeature: Feature) => void;
  
  // Core structure locked
  coordinates: readonly string;
  name: readonly string;
  
  // Public history begins
  transitions: public[];
}
```

### Transition Privacy

- During virtual phase:
    - Private experimentation encouraged
    - No requirement to record transitions
    - Developer controls what to expose
    - Only final state matters

- After reality point:
    - Structure locked
    - Only extensions possible
    - Public history begins
    - Changes tracked

### Community Standards & Domain Transparency

Transparency is structured by domains:

```typescript
interface TransparencyDomains {
  // Critical to share decision rationale
  decisions: {
    architecturalChoices: string[];
    interfaceChanges: string[];
    coordinateSelections: string[];
    rating: number;  // Affects developer rating
  };

  // Noise can be suppressed
  implementation: {
    experiments: private[];
    iterations: private[];
    refactoring: private[];
    rating: number;  // No rating impact
  };
}

// Community rating system
interface DeveloperRating {
  decision_transparency: number;   // Important
  noise_suppression: number;      // Beneficial
  overall: number;                // Weighted towards decisions
}
```

What matters:

- Core decision rationale preserved
- Architectural choices explained
- Interface evolution documented
- Coordinate selection justified

What can be private:

- Implementation experiments
- Code iterations
- Refactoring steps
- Development noise

The rating system encourages:

- Clear documentation of key decisions
- Suppression of implementation noise
- Focus on architectural significance
- Quality over quantity in history

## Information Preservation

State changes maintain context:

```typescript
// State transition preserves history
interface StateTransition {
  from: {
    coordinates: string;
    state: "virtual";
    context: Record<string, unknown>;
  };
  to: {
    coordinates: string;
    state: "stable";
    context: Record<string, unknown>;
  };
  git: {
    commit: string;
    branch: string;
    timestamp: number;
  };
}
```

## Boundary Formation

Natural boundaries emerge through use:

```tsx
// Clear domain separation
<STARepo 
  coordinates="11.0.0"
  name="spicetime-architecture">
  {/* Data processing domain */}
  <Package name="utils" coordinates="11.3">
    <Package name="aggregator" coordinates="11.3.4" />
    <Package name="processor" coordinates="11.3.5" />
  </Package>
  
  {/* UI component domain */}
  <Package name="components" coordinates="11.5">
    <Package name="core" coordinates="11.5.4" />
    <Package name="forms" coordinates="11.5.5" />
  </Package>
</STARepo>
```

Each domain maintains its own:

- Development patterns
- Testing strategies
- Documentation approaches
- Evolution paths