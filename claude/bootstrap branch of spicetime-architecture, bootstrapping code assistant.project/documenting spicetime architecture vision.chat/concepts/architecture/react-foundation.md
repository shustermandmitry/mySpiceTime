File: docs/concepts/architecture/react-foundation.md

# React Foundation: Build-time React App

## React as Build System

SpiceTime uses React's component model at build time to define and construct package structure:

```typescript
// Core build-time components
interface BuildProps {
  coordinates: string;
  virtual?: boolean;
}

const STARepo: React.FC<BuildProps> = ({ 
  coordinates, 
  virtual = true,
  children 
}) => {
  // Let React handle component lifecycle
  return (
    <BuildContext.Provider value={{ coordinates }}>
      {children}
    </BuildContext.Provider>
  );
};

const Package: React.FC<BuildProps> = ({
  coordinates,
  virtual = true,
  children
}) => {
  // React manages state and updates
  return children;
};
```

## Component Structure

Package relationships flow naturally through React's component hierarchy:

```typescript
// Build time app structure
const BuildApp = () => (
  <STARepo coordinates="11.0.0">
    <Package name="utils" coordinates="11.3.4">
      <Package name="aggregator" coordinates="11.3.4.1" />
      <Package name="processor" coordinates="11.3.4.2" />
    </Package>
  </STARepo>
);
```

## State Management

React's built-in state management handles package state:

```typescript
const BuildContext = React.createContext<BuildState>(null);

const BuildProvider: React.FC = ({ children }) => {
  // React handles state updates
  const [virtualPackages, setVirtualPackages] = useState(new Map());
  const [realityPoints, setRealityPoints] = useState(new Map());

  return (
    <BuildContext.Provider 
      value={{ 
        virtualPackages, 
        realityPoints,
        materialize: (pkg) => {
          setVirtualPackages(v => {
            const next = new Map(v);
            next.delete(pkg.coordinates);
            return next;
          });
          setRealityPoints(r => {
            const next = new Map(r);
            next.set(pkg.coordinates, pkg);
            return next;
          });
        }
      }}
    >
      {children}
    </BuildContext.Provider>
  );
};
```

## Effect Handling

React effects manage side effects naturally:

```typescript
const Package: React.FC<BuildProps> = ({ coordinates, virtual, children }) => {
  const { materialize } = useContext(BuildContext);

  useEffect(() => {
    if (!virtual) {
      materialize({
        coordinates,
        content: children
      });
    }
  }, [virtual, coordinates]);

  return children;
};
```

## Build App

The complete build app simply uses React patterns:

```typescript
const BuildApp = () => (
  <BuildProvider>
    <STARepo coordinates="11.0.0">
      <Package name="utils" coordinates="11.3.4">
        <Package name="aggregator" coordinates="11.3.4.1" />
      </Package>
    </STARepo>
  </BuildProvider>
);
```

React naturally provides:

- Component hierarchy
- State management
- Props flow
- Effect handling
- Context distribution