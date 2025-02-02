# Progressive Code Analysis: Usage Guide

## Quick Start

### Installation

```bash
npm install @pcas/core @pcas/tools

# Install required peer dependencies
npm install typescript madge typedoc eslint
```

### Basic Usage

```typescript
import { CodeAnalyzer } from '@pcas/core';

// Initialize analyzer
const analyzer = new CodeAnalyzer({
  entryPoints: ['./src'],
  maxDepth: 3
});

// Run progressive analysis
for (let level = 0; level <= 3; level++) {
  const result = await analyzer.analyzeLayer(level);
  console.log(`Level ${level}:`, result.summary);
}
```

## Configuration

### Basic Configuration

```typescript
const config = {
  // Required: Entry points for analysis
  entryPoints: ['./src'],
  
  // Optional: Exclude patterns
  excludePatterns: ['**/*.test.*', '**/node_modules/**'],
  
  // Optional: Maximum analysis depth (0-3)
  maxDepth: 3,
  
  // Optional: Cache strategy
  cacheStrategy: 'memory',
  
  // Optional: Tool-specific configs
  tools: {
    typeDoc: {
      // TypeDoc specific options
    },
    madge: {
      // Madge specific options
    }
  }
};
```

### Cache Strategies

1. **Memory Cache**

```typescript
const analyzer = new CodeAnalyzer({
  cacheStrategy: 'memory',
  maxCacheSize: '1GB'  // Optional
});
```

2. **Disk Cache**

```typescript
const analyzer = new CodeAnalyzer({
  cacheStrategy: 'disk',
  cachePath: './cache'  // Optional
});
```

3. **No Cache**

```typescript
const analyzer = new CodeAnalyzer({
  cacheStrategy: 'none'
});
```

## Analysis Layers

### Layer 0: Project Structure

```typescript
// Get high-level project structure
const structure = await analyzer.analyzeLayer(0);

console.log(structure.summary);
// Output: {
//   files: number,
//   modules: number,
//   dependencies: number
// }

// Access detailed structure
console.log(structure.details.modules);
```

### Layer 1: Dependencies

```typescript
const dependencies = await analyzer.analyzeLayer(1);

// Check for circular dependencies
console.log(dependencies.details.circular);

// Get dependency graph
console.log(dependencies.details.graph);
```

### Layer 2: Module Analysis

```typescript
const modules = await analyzer.analyzeLayer(2);

// Get module interfaces
console.log(modules.details.files);

// Analyze specific file
const fileAnalysis = modules.details.files
  .find(f => f.fileName === 'target.ts');
```

### Layer 3: Implementation Details

```typescript
const details = await analyzer.analyzeLayer(3);

// Get comprehensive analysis
console.log(details.details.metrics);
```

## Error Handling

### Basic Error Handling

```typescript
try {
  const result = await analyzer.analyzeLayer(1);
} catch (error) {
  if (error.layer !== undefined) {
    // Layer-specific error
    console.error(`Layer ${error.layer} failed:`, error.message);
  } else {
    // General error
    console.error('Analysis failed:', error);
  }
}
```

### Progressive Error Recovery

```typescript
const analyzeWithFallback = async (level) => {
  try {
    return await analyzer.analyzeLayer(level);
  } catch (error) {
    // Fallback to previous level
    if (level > 0) {
      console.warn(`Falling back to level ${level - 1}`);
      return analyzeWithFallback(level - 1);
    }
    throw error;
  }
};
```

## Best Practices

### 1. Project Analysis

- Start with layer 0 for overview
- Increase depth based on needs
- Cache results for large projects
- Monitor resource usage

### 2. Performance Optimization

- Use appropriate cache strategy
- Limit analysis depth when possible
- Implement proper error handling
- Clean up resources

### 3. Integration

- Set up in CI/CD pipelines
- Automate regular analysis
- Monitor trends over time
- Store results for comparison

## Common Use Cases

### 1. Project Overview

```typescript
const getProjectOverview = async () => {
  const structure = await analyzer.analyzeLayer(0);
  return {
    files: structure.summary.files,
    dependencies: structure.summary.dependencies,
    overview: structure.details.modules
  };
};
```

### 2. Dependency Check

```typescript
const checkDependencies = async () => {
  const deps = await analyzer.analyzeLayer(1);
  return {
    circular: deps.details.circular,
    orphans: deps.details.orphans,
    graph: deps.details.graph
  };
};
```

### 3. Code Quality Analysis

```typescript
const analyzeCodeQuality = async () => {
  const details = await analyzer.analyzeLayer(3);
  return {
    metrics: details.details.metrics,
    issues: details.details.issues,
    suggestions: details.details.suggestions
  };
};
```

## Troubleshooting

### Common Issues

1. **Memory Issues**

```typescript
// Reduce memory usage
const analyzer = new CodeAnalyzer({
  maxDepth: 2,
  cacheStrategy: 'disk',
  tools: {
    typeDoc: {
      skipLibCheck: true
    }
  }
});
```

2. **Performance Issues**

```typescript
// Optimize performance
const analyzer = new CodeAnalyzer({
  excludePatterns: ['**/*.test.*', '**/*.spec.*'],
  maxDepth: 1,
  cacheStrategy: 'memory'
});
```

3. **Tool Errors**

```typescript
// Configure tool fallbacks
const analyzer = new CodeAnalyzer({
  tools: {
    fallbackStrategy: 'skip-failed',
    timeouts: {
      typeDoc: 30000,
      madge: 20000
    }
  }
});
```