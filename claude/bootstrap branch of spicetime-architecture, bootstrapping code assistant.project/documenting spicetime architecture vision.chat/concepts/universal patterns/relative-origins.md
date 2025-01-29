File: docs/concepts/universal-pattern/relative-origins.md

# Relative Origins: No Absolute Beginning

## Coordinate System Transforms

SpiceTime's coordinate system transforms from existing systems:

```typescript
// Git coordinates
interface GitCoordinates {
  commit: string;
  branch: string;
  tag?: string;
}

// pnpm workspace coordinates
interface WorkspaceCoordinates {
  path: string;
  package: string;
  version: string;
}

// Transform to SpiceTime coordinates
interface SpiceTimeCoordinates {
  major: number;    // Materialized time
  domain: number;   // Group position
  position: number; // Specific location
}

// Runtime translation
const translateCoordinates = (source: GitCoordinates | WorkspaceCoordinates) => {
  return SpiceTimeCoordinates;
};
```

## Pattern Inheritance

Core patterns transform from React and pnpm:

```tsx
// React's component model becomes package structure
interface Package extends Component {
  coordinates: SpiceTimeCoordinates;
  virtualState: boolean;
}

// pnpm's workspace becomes reality mapping
interface RealityPoint {
  coordinates: SpiceTimeCoordinates;
  workspace: string;
  implementation: string;
}

// Git history becomes transition record
interface Transition {
  from: SpiceTimeCoordinates;
  to: SpiceTimeCoordinates;
  commit: string;
  rationale: string;
}
```

## Starting Points

A package can originate from any existing context:

```typescript
// From git repository
const fromGit = {
  source: "git",
  url: "github.com/org/repo",
  branch: "main",
  coordinates: "11.3.4"  // Assigned in SpiceTime
};

// From npm package
const fromNpm = {
  source: "npm",
  package: "@scope/package",
  version: "1.0.0",
  coordinates: "11.3.5"  // Assigned in SpiceTime
};

// From workspace
const fromWorkspace = {
  source: "workspace",
  path: "./packages/utils",
  coordinates: "11.3.6"  // Assigned in SpiceTime
};
```

## Reference Frame Shifts

Coordinate meaning shifts based on context:

```typescript
interface ReferenceFrame {
  // In git space
  git: {
    main: string;      // Branch
    v1.0.0: string;    // Tag
  };

  // In workspace space
  workspace: {
    path: string;      // Location
    name: string;      // Package name
  };

  // In SpiceTime space
  spicetime: {
    coordinates: string;  // x.y.z position
    virtual: boolean;    // State flag
  };
}

// Context determines meaning
const resolveLocation = (frame: ReferenceFrame) => {
  switch (context) {
    case "git": return frame.git;
    case "workspace": return frame.workspace;
    case "spicetime": return frame.spicetime;
  }
};
```

## Heritage Tracking

Packages maintain their origins:

```typescript
interface Heritage {
  // Original source
  origin: {
    type: "git" | "npm" | "workspace";
    reference: string;
  };

  // Transformation path
  path: Transition[];

  // Current position
  current: SpiceTimeCoordinates;
}

// Example heritage record
const packageHeritage: Heritage = {
  origin: {
    type: "git",
    reference: "github.com/org/original-repo"
  },
  path: [
    {
      from: { type: "git", reference: "main" },
      to: { type: "spicetime", coordinates: "11.3.4" },
      rationale: "Integrated utility functions"
    }
  ],
  current: {
    major: 11,
    domain: 3,
    position: 4
  }
};
```

## State Preservation

Transformations preserve essential state:

```typescript
interface StateTransform {
  // Preserve git history
  history: {
    commits: string[];
    branches: string[];
    tags: string[];
  };

  // Preserve package info
  package: {
    name: string;
    version: string;
    dependencies: Record<string, string>;
  };

  // Add SpiceTime context
  spicetime: {
    coordinates: string;
    virtual: boolean;
    transitions: Transition[];
  };
}
```

Information flows between systems while maintaining context and relationships.