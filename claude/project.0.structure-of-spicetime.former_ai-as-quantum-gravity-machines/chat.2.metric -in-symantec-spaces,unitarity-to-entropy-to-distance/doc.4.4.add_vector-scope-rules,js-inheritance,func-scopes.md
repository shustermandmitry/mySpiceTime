# Domain Filesystem Profile Vector
## Special File Conventions
### Tic 4.0

### Key Profile Files (All Optional)

1. Vector Management
   - chat.vector_toc.[tic].md        # Current vector catalog
   - vector_toc.[tic].md             # Tic-specific vector catalog
   - vector_[name].scope.[tic].md    # Vector scope at tic point

2. Temporal Organization
   - chat.summary.[tic].md           # Chat state summary
   - chat.log.[tic].md               # Development log
   - chat.doc.[tic].md               # Documentation

3. Scope Management
   - chat.scope.md                   # Aggregate of all tic scopes
   - chat.scope.[tic].md             # Tic-specific scope
   - vector.scope.[tic].md           # Vector scope at tic

### Scope Inheritance
- Vectors inherit through tics like hierarchical functions
- New properties/vectors visible in later tics
- Earlier properties extended by tic number
- No shadowing between tics (natural temporal visibility)
- Time creates natural scope progression

### Implementation Notes
1. Temporal Properties
   - Later tics see earlier scopes
   - Properties accumulate through time
   - Natural inheritance through tics
   - Progressive scope extension

2. Vector Scopes
   - Each vector maintains its scope
   - Inherits through temporal chain
   - Properties extend, never shadow
   - Scope visible to interpreter

3. File Optionality
   - All profile files are optional
   - Present based on need
   - Can be generated when required
   - Flexible per chat/project

### Example Progression
```
Tic 1:
  vector_a.scope.1.md: { prop: value }

Tic 2:
  vector_a.scope.2.md: { prop: extended_value }
  chat.scope.2.md: { context: new }

Tic 3:
  vector_b.scope.3.md: { new_prop: value }
  chat.scope.md: { aggregated: contexts }
```

*Note: This profile system creates a natural temporal scope hierarchy while maintaining flexibility through optional file presence.*