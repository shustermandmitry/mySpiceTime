# SpiceTime Tics: Content Evolution Structure

## Core Concepts

### Nodes (Space)

- Base content units that exist outside the time structure
- Created without a tic number (e.g., `dogFood.md`, `catFood.md`)
- Represent starting points or stable reference points
- Can spawn multiple evolution timelines

### Tics (Time)

- Evolution points in a content's timeline
- Represented by real and imaginary numbers
- Format: `[base].[descriptor].tic.[real].[imaginary].[meta].[ext]`
- Real part tracks main evolution
- Imaginary part tracks parallel thoughts/variations

### Example Structure

```
project/
  ├── dogFood.md                   # Space node
  ├── dogFood.bad.tic.1.md         # Timeline: bad variant
  ├── dogFood.good.tic.1.1.md      # Timeline: good variant, parallel thought
  └── catFood.md                   # Independent space node
```

## Naming Convention

### Pattern

```
[base title].[tic title].tic.[real:integer].[imaginary:integer].[meta].[extension]
```

### Components

1. **base title**: Core concept identifier (e.g., dogFood)
2. **tic title**: Descriptive label for this evolution (e.g., bad, good)
3. **tic**: Fixed marker indicating this is a temporal variant
4. **real**: Main sequence number (1,2,3...)
5. **imaginary**: Parallel thought number (0,1,2...)
6. **meta**: Optional additional classification
7. **extension**: File type (md, txt, js, ts, jsx, tsx, json)

### Rules

- Node files omit the tic numbering (e.g., `dogFood.md`)
- Real part 0 is implicit in node files
- Imaginary part tracks parallel thoughts at a given real time point
- Extensions determine content type and processing

## Temporal Relationships

### Main Timeline

- Tracked by real number
- Represents primary evolution path
- Sequential developments (1,2,3...)

### Parallel Thoughts

- Tracked by imaginary number
- Variations at a single time point
- Alternative approaches/ideas

### Example Evolution

```
dogFood.md                    # Initial concept
├── dogFood.bad.tic.1.md     # First evolution
├── dogFood.good.tic.1.1.md  # Parallel thought at time 1
└── dogFood.best.tic.2.md    # Next main evolution
```

## Implementation Guidelines

### File System Operations

1. **Node Creation**
    - Simple file without tic numbers
    - Establishes a new space point

2. **Tic Creation**
    - Follows naming convention
    - Links to parent node
    - Tracks evolution metadata

3. **Timeline Management**
    - Maintain ordering of real numbers
    - Allow parallel imaginary branches
    - Support metadata extensions

### Content Tracking

1. **Node Content**
    - Base concepts
    - Core documentation
    - Stable reference points

2. **Tic Content**
    - Evolution details
    - Change rationale
    - Relationship to parent

### Usage Patterns

#### Creating New Concepts

```bash
# Create new space node
touch concept.md

# Add first evolution
touch concept.initial.tic.1.md

# Add parallel thought
touch concept.alternative.tic.1.1.md
```

#### Managing Evolution

```bash
# Next main evolution
touch concept.improved.tic.2.md

# Parallel thought on new evolution
touch concept.variation.tic.2.1.md
```

## Benefits

1. **Granular Evolution Tracking**
    - More detailed than git alone
    - Captures thought process
    - Preserves alternatives

2. **Clear Structure**
    - Obvious relationships
    - Easy to follow evolution
    - Self-documenting

3. **Flexible Organization**
    - Supports multiple timelines
    - Allows parallel thoughts
    - Maintains context

4. **Enhanced Documentation**
    - Process transparency
    - Decision tracking
    - Evolution clarity