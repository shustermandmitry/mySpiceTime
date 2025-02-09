# Naming Convention System
## Symbol Semantics and Usage

### Core Symbols

1. Underscore (_)
   - Indicates property relationship
   - Links to previous command
   - Connects to keywords
   - Example: `summary_2_0` (property chain)

2. Hyphen (-)
   - Word separator in properties
   - OS-friendly spacing
   - Example: `file-structure-description`

3. Period (.)
   - Natural bracket/separator
   - Equivalent to underscore in many contexts
   - Example: `summary.2.0.vector_name`

### Extended Symbol Set
```
() - Grouping/scope
{} - Variable/template
;  - Command separation
|  - Alternative paths
,  - List elements
```

### Semantic Flexibility

1. Context Adaptation
   - Symbols may shift meaning based on content type
   - Maintains OS compatibility
   - Preserves semantic intent
   - Allows domain-specific interpretation

2. Usage Constraints
   - One-line CLI representation limits
   - OS naming conventions
   - File system restrictions
   - Path length limitations

3. Resolution Strategy
   - Primary symbol choice (_-.) based on context
   - Secondary symbols based on need
   - Fallback patterns for restrictions
   - Semantic preservation priority

### Example Patterns

1. File Names:
```
doc.2.2.naming_convention.md     // Periods as major separators
api-documentation_draft.md       // Mixed usage for clarity
vector_analysis-part1.ts         // Property then description
```

2. Path Components:
```
project_name/                    // Entity identifier
  chat-session-1/               // Descriptive grouping
    summary.2.0.vector_name.md   // Full semantic path
```

3. Variable Patterns:
```
{tic}.{vector}-{description}    // Template pattern
summary_{index}_draft           // Property with modifier
analysis-{type}-v{version}     // Mixed notation
```

### Best Practices

1. Symbol Selection
   - Use _ for property relationships
   - Use - for word separation
   - Use . for natural breaks
   - Mix thoughtfully for clarity

2. Semantic Clarity
   - Maintain consistent meaning
   - Adapt to context needs
   - Preserve readability
   - Consider tool compatibility

3. System Compatibility
   - Honor OS limitations
   - Ensure valid paths
   - Support common tools
   - Enable easy parsing

### Implementation Notes

1. Parser Considerations
   - Define symbol hierarchy
   - Handle context-specific meanings
   - Implement fallback patterns
   - Maintain extensibility

2. Tool Integration
   - CLI argument parsing
   - File system operations
   - Search functionality
   - Path manipulation

*Note: This convention system balances semantic richness with practical constraints while maintaining flexibility for various contexts and uses.*