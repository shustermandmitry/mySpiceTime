/* COMMAND INSERT PATH docs/concepts/universal-pattern/relative-origins.md */

## Observer Perspectives

Each instance of spicetime-react-app represents a unique vantage point in the SpiceTime universe:

```typescript
interface SpiceTimeNode {
  // Current observer's coordinates
  coordinates: SpiceTimeCoordinates;
  
  // What this node can perceive
  perspective: {
    // Core reality - always consistent across nodes
    structure: {
      coordinates: Map<string, SpiceTimeCoordinates>;  // Package locations
      names: Map<string, string>;                      // Package names
    };

    // Local reality - may vary between nodes
    content: {
      packages: Map<string, {
        content: string;
        lastSync: number;
        syncStatus: 'current' | 'stale' | 'inaccessible';
      }>;
    };

    // Visibility limitations
    shading: {
      updateLatency: number;     // Speed of updates
      accessRestrictions: string[];  // Limited access
      interestFilters: string[];    // Chosen focus
    };
  };
}
```

Each node:

- Agrees on fundamental structure (coordinates and names)
- Maintains its own view of package contents
- Has natural update latency
- May have limited access
- Chooses what to focus on
- Understands its view may be shaded

This distributed perspective system means:

- Core reality (structure) is consistent
- Local reality (content) may vary
- Variations are expected and valid
- Each node knows its limitations
- Update speed is a natural constraint
- Focus can be intentionally limited

/* COMMAND INSERT END */