File: docs/concepts/architecture/materialization.md

# Materialization: Reality Points

## Package Reality

A package becomes real when it appears in SpiceTime Architecture's package.json:

```typescript
// In spicetime-architecture/package.json
{
  "name": "spicetime-architecture",
  "version": "11.0.0",
  "spicetime": {
    "packages": {
      "@spicetime/utils": {
        "coordinates": "11.3.4",
        "virtual": false,
        "state": "stable"
      }
    }
  }
}
```

This creates a reality point for @spicetime/utils at coordinates 11.3.4.

## Virtual Phase Freedom

Before materialization, a package has complete freedom:

```typescript
// Developer exploring possibilities
const virtualPhase = {
  name: "temp_name",             // Can change
  location: "anywhere",          // Can move
  structure: "in_flux",          // Can reorganize
  transitions: private[]         // No need to record
};

// Once materialized
const realityPoint = {
  name: readonly string;         // Fixed
  coordinates: readonly string;  // Locked
  structure: readonly any;       // Stable
  transitions: public[];         // Recorded
};
```

## Materialization Process

Converting virtual to real involves:

```typescript
interface MaterializationSteps {
  // Finalize package
  preparation: {
    validateStructure: () => boolean;
    finalizeTests: () => boolean;
    completeDocumentation: () => boolean;
  };

  // Update SpiceTime Architecture
  materialization: {
    updatePackageJson: () => void;
    setVirtualFalse: () => void;
    recordCoordinates: () => void;
  };
}

// Example materialization
const materialize = async (pkg: Package) => {
  // Final validation
  await validatePackage(pkg);

  // Update STA package.json
  await updateStaPackageJson({
    [`@spicetime/${pkg.name}`]: {
      coordinates: pkg.coordinates,
      virtual: false,
      state: 'stable'
    }
  });
};
```

## Extensions Only

After materialization, only extensions allowed:

```typescript
interface StablePackage {
  // Core aspects locked
  readonly name: string;
  readonly coordinates: string;
  readonly structure: any;

  // Can only extend
  extend: (feature: Feature) => void;
  addTests: (tests: Test[]) => void;
  enhanceDoc: (docs: Doc[]) => void;
}

// Not allowed after materialization
const forbidden = {
  rename: () => Error("Cannot rename materialized package"),
  move: () => Error("Cannot change coordinates"),
  restructure: () => Error("Cannot change core structure")
};
```

## Inherited Reality

When a package materializes, it affects its dependents:

```typescript
interface RealityInheritance {
  package: string;
  materializedAt: string;
  dependents: Array<{
    name: string;
    impact: 'none' | 'minor' | 'major';
    requiredAction?: string;
  }>;
}

// Example impact check
const checkInheritance = (pkg: Package): RealityInheritance => {
  return {
    package: pkg.name,
    materializedAt: pkg.coordinates,
    dependents: findDependents(pkg).map(dep => ({
      name: dep.name,
      impact: assessImpact(pkg, dep),
      requiredAction: getRequiredAction(pkg, dep)
    }))
  };
};
```

## Reality Recording

The materialization process is recorded in the graph:

```typescript
interface RealityPoint {
  // Core reality
  package: string;
  coordinates: string;
  timestamp: number;

  // Context
  history: {
    virtualPhase: {
      duration: number;
      keyDecisions: string[];
    };
    materialization: {
      reason: string;
      validator: string;
      timestamp: number;
    };
  };
}

// Record the transition
const recordMaterialization = (
  pkg: Package,
  context: MaterializationContext
): RealityPoint => {
  return {
    package: pkg.name,
    coordinates: pkg.coordinates,
    timestamp: Date.now(),
    history: {
      virtualPhase: {
        duration: context.virtualDuration,
        keyDecisions: context.decisions
      },
      materialization: {
        reason: context.reason,
        validator: context.validator,
        timestamp: context.timestamp
      }
    }
  };
};
```