File: docs/concepts/universal-pattern/creation-process.md

# Creation Process: From Quantum to Reality

## State Management Foundation

The SpiceTime React application and developers maintain a bidirectional relationship in managing state through git:

```tsx
const CollaborativeEnvironment = () => {
  const [state, setState] = useSTAState({
    source: 'git',
    branch: 'main',
    watchMode: 'bidirectional'  // React adapts to git changes
  });

  useEffect(() => {
    gitWatcher.on('change', async (changes) => {
      try {
        await interpretGitChanges(changes);
      } catch (e) {
        await promptUserForContext(changes);
      }
    });
  }, []);

  return (
    <STAContext.Provider value={{ state, setState }}>
      <STARepo coordinates="11.0.0">
        <STRepo name="utils" coordinates="11.3.4">
          <Package name="aggregator" />
        </STRepo>
      </STARepo>
    </STAContext.Provider>
  );
};
```

Developers maintain full flexibility:

- Work through React interface for structured operations
- Use direct git commands for flexibility
- React app adapts to either approach
- May request context if git changes are unclear

## Package Reality Points

A package gains existence in SPM space through its state in SpiceTime Architecture's package.json:

```json
{
  "name": "spicetime-architecture",
  "version": "11.0.0",
  "dependencies": {
    "@spicetime/aggregator": "workspace:*"
  },
  "spicetime": {
    "packages": {
      "@spicetime/aggregator": {
        "coordinates": "11.3.4",
        "state": "stable",
        "virtual": false
      }
    }
  }
}
```

This creates the reality point for @spicetime/aggregator at coordinates 11.3.4 in SPM space.

## The Graph Structure

SpiceTime's fundamental structure is a graph in the graph database, representing:

- Package coordinates in space (x.y)
- Time variations (versions)
- Component relationships
- Development paths

The state initialization flow:

1. React app starts
2. Git state loads
3. Graph hydrates
4. Components render
5. Bidirectional sync begins

Development can proceed through:

```bash
# React interface (structured)
<STRepo name="processor" coordinates="11.4.5" />

# Or direct git (flexible)
git checkout -b feature/processor
git commit -m "feat: add processor utility"

# React adapts to either approach
```

## Time Evolution

State progression follows:

1. Initial virtual state
2. Development iterations
3. Reality point creation (package.json update)
4. Continued evolution

Each change is captured in git history and interpreted in SpiceTime space, whether initiated through React components or
direct git operations.