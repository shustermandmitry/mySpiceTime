# Project Instructions: Keyword Operations
## Tic 6.0

### Number-Based Navigation

1. Path Structure
```
doc.tic.vector.operation.md
# Example: doc.2.3.add_feature.md
```

2. Benefits
- Reduced cognitive load
- Easier navigation
- Clear temporal position
- Unambiguous references

### Keyword Operations

1. Add (Default)
```
# These are equivalent:
doc.2.3.feature.md
doc.2.3.add_feature.md
```

2. Update
```
# Update existing content:
doc.2.3.update_3.md        # By number
doc.2.3.update_feature.md  # By name (legacy support)
```

### Vector Management

1. Number Assignment
- Automatic next number in scope
- Immutable once assigned
- Consistent across chat
- Independent of names

2. Content Operations
```
# New vector (implicit add)
doc.2.5.feature.md         # Gets next available number

# Update existing
doc.2.5.update_3.md        # Updates vector 3 content
```

### Snapshot System

1. Complete State Capture
```
snapshot.2.md              # All vectors up to tic 2
```

2. Timing Requirements
- Must capture within tic
- Prevents future detachment
- Includes all scope vectors
- Preserves relationships

### Best Practices

1. Use Numbers
- Prefer number references
- Maintain number immutability
- Document number assignments
- Track vector evolution

2. Default Operations
- Use implicit add when possible
- Explicit update for changes
- Clear operation intent
- Maintain scope awareness

3. Snapshot Management
- Create within tic window
- Include all scope vectors
- Document relationships
- Prevent detachment

*Note: These conventions simplify navigation and maintenance while ensuring system integrity.*