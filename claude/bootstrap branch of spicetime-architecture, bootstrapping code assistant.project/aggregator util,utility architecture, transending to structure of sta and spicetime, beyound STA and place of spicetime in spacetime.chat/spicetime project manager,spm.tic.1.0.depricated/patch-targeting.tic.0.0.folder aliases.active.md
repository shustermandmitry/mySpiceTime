# SpiceTime Patch Targeting: Folder Aliases

## Patch File Targeting

### Simple Patch Example

```patch
--package AggregatorComponent
--file @components/test.tsx
+ import { something } from '@utils/core';
+ 
+ export const TestComponent = () => {
+   return <div>New Test</div>;
+ };
```

Resolves to: `packages/components/Aggregator/tests/aggregator.test.tsx`

### Standard Folder Aliases

```
@components/  -> Current package's components folder
@utils/       -> Current package's utilities
@tests/       -> Current package's test files
@styles/      -> Current package's styles
@root/        -> Package root
```

### Contextual Resolution

```patch
--package AggregatorComponent
--file @tests/unit/parser.test.tsx
+ test('parser handles empty input', () => {
+   expect(parse('')).toBe(null);
+ });
```

SPM knows:

- We're in AggregatorComponent context
- @tests resolves to test folder
- unit/parser.test.tsx is relative to test folder
- Full path: packages/components/Aggregator/tests/unit/parser.test.tsx

### Multiple File Changes

```patch
--package AggregatorComponent
--file @components/main.tsx
+ import { Parser } from '@utils/parser';

--file @utils/parser.ts
+ export class Parser {
+   parse(input: string) { ... }
+ }

--file @tests/parser.test.tsx
+ import { Parser } from '@utils/parser';
```

### Folder Structure Independence

```patch
# Works regardless of actual folder structure:

repo1/
  └── packages/
      └── components/
          └── Aggregator/
              └── tests/

repo2/
  └── src/
      └── components/
          └── Aggregator/
              └── __tests__/

# Same patch works for both:
--package AggregatorComponent
--file @tests/feature.test.tsx
+ import { test } from '@core/testing';
```

## Benefits

### 1. Location Abstraction

- Patches don't need to know real paths
- Aliases resolve based on context
- Structure can vary between repos
- Same patches work everywhere

### 2. Semantic Targeting

- Target files by role (@tests, @components)
- Context aware resolution
- Clear file purpose
- Structure independence

### 3. Package Context

- Patches declare target package
- All paths relative to package
- Clear scope of changes
- Maintainable patches

## Practical Examples

### Component Testing

```patch
--package AggregatorComponent
--file @tests/integration/flow.test.tsx
+ import { render } from '@testing-library/react';
+ import { Aggregator } from '@components/Aggregator';
+
+ describe('Aggregator Flow', () => {
+   test('processes data correctly', () => {
+     const { result } = render(<Aggregator data={testData} />);
+     expect(result).toMatchSnapshot();
+   });
+ });
```

### Style Updates

```patch
--package AggregatorComponent
--file @styles/theme.css
+ .aggregator-container {
+   display: flex;
+   gap: 1rem;
+ }

--file @components/layout.tsx
+ import '@styles/theme.css';
```

### Utility Addition

```patch
--package AggregatorComponent
--file @utils/helpers.ts
+ export const formatData = (input: string) => {
+   return input.trim().toLowerCase();
+ };

--file @tests/helpers.test.ts
+ import { formatData } from '@utils/helpers';
+
+ test('formatData', () => {
+   expect(formatData(' TEST ')).toBe('test');
+ });
```

## Summary

SpiceTime's folder aliases provide:

1. Context-aware file targeting
2. Structure independence
3. Clear file organization
4. Maintainable patches
5. Cross-repo compatibility

This enables patches to:

- Target files semantically
- Work across different structures
- Maintain clarity of purpose
- Stay maintainable long-term