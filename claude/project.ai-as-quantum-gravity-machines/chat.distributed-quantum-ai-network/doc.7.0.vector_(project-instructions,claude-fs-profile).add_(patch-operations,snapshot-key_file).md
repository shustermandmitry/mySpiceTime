# Project Instructions: Patch Operations
## Tic 7.0

### Vector Snapshots

1. Complete Vector State
```
snapshot.[tic].md           # Consolidated vector documentation
- Applies all patches sequentially
- Creates detailed, complete state
- Full documentation, not summary
- All patches up to tic
```

### Multi-Vector Operations

1. Vector Lists:
```
# Comma separation
summary.2.3.add_(feature1,feature2)

# Range notation
doc.2.(3-5).update_impl     # Vectors 3,4,5
```

### Patch Aggregation

1. In-File Patches:
```markdown
# Initial implementation...

Note to patchDispatch: add_feature
[Feature implementation...]

Note to patchDispatch: update_component
[Component updates...]
```

2. Combined Operations:
```
# Multiple actions
summary.2.3.add_(x,y),update_z.md

# Ranged multiple actions
doc.2.(1-3).add_a,update_b.md
```

### Best Practices

1. File Organization:
- Group related changes
- Clear action specification
- Logical patch ordering
- State consistency

2. Patch Management:
- Sequential application
- Clear documentation
- State validation
- Change tracking

3. Multi-Vector Operations:
- Use ranges for clarity
- Group related changes
- Maintain consistency
- Document relationships

*Note: These conventions enable efficient management of complex changes across multiple vectors.