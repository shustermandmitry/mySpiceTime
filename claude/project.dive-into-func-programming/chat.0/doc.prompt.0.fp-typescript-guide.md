# Functional Programming Patterns in TypeScript

## Core Concepts

### Pure Functions
Functions that:
- Given the same input, always return the same output
- Have no side effects
- Don't modify external state

```typescript
// Pure
const add = (a: number, b: number): number => a + b;

// Impure
let total = 0;
const addToTotal = (n: number): number => {
  total += n;  // Modifies external state
  return total;
};
```

### Immutability
Data shouldn't be modified after creation. Use spread operators and map/filter instead of mutations.

```typescript
// Immutable operations
const addItem = <T>(arr: readonly T[], item: T): readonly T[] => [...arr, item];
const removeItem = <T>(arr: readonly T[], index: number): readonly T[] => 
  [...arr.slice(0, index), ...arr.slice(index + 1)];

// Type-safe immutable data
type UserData = Readonly<{
  name: string;
  age: number;
}>;
```

### Higher-Order Functions
Functions that take functions as arguments or return functions.

```typescript
type Predicate<T> = (value: T) => boolean;
type Mapper<T, U> = (value: T) => U;

const filter = <T>(pred: Predicate<T>) => (arr: T[]): T[] => 
  arr.filter(pred);

const map = <T, U>(fn: Mapper<T, U>) => (arr: T[]): U[] => 
  arr.map(fn);
```

### Currying
Transform a function with multiple arguments into a sequence of functions that each take a single argument.

```typescript
// Basic curry type
type Curry<P extends any[], R> = 
  P extends [infer First, ...infer Rest]
    ? (arg: First) => Curry<Rest, R>
    : R;

// Implementation
const curry = <P extends any[], R>(
  fn: (...args: P) => R,
  arity = fn.length
): Curry<P, R> => {
  const curried = (...args: any[]) =>
    args.length >= arity
      ? fn(...args)
      : (...more: any[]) => curried(...args, ...more);
  return curried as Curry<P, R>;
};

// Usage
const curriedAdd = curry((a: number, b: number) => a + b);
const add5 = curriedAdd(5);  // (b: number) => number
```

### Function Composition
Combine multiple functions into a single function, where output of one feeds into input of next.

```typescript
type Func<T, U> = (input: T) => U;

const compose = <A, B, C>(
  f: Func<B, C>,
  g: Func<A, B>
): Func<A, C> => (x: A): C => f(g(x));

// More generic compose
const composeMany = <T>(...fns: Array<(arg: T) => T>) =>
  fns.reduce((prevFn, nextFn) =>
    (value: T): T => nextFn(prevFn(value)));
```

### Option/Maybe Type
Handle nullable values safely:

```typescript
type Option<T> = Some<T> | None;

interface Some<T> {
  kind: 'some';
  value: T;
}

interface None {
  kind: 'none';
}

const some = <T>(value: T): Option<T> => ({
  kind: 'some',
  value
});

const none = (): None => ({
  kind: 'none'
});

// Option utilities
const map = <T, U>(option: Option<T>, fn: (value: T) => U): Option<U> =>
  option.kind === 'some'
    ? some(fn(option.value))
    : none();

const flatMap = <T, U>(
  option: Option<T>,
  fn: (value: T) => Option<U>
): Option<U> =>
  option.kind === 'some'
    ? fn(option.value)
    : none();
```

### Either Type
Handle success/failure cases explicitly:

```typescript
type Either<E, A> = Left<E> | Right<A>;

interface Left<E> {
  kind: 'left';
  error: E;
}

interface Right<A> {
  kind: 'right';
  value: A;
}

const left = <E>(error: E): Either<E, never> => ({
  kind: 'left',
  error
});

const right = <A>(value: A): Either<never, A> => ({
  kind: 'right',
  value
});

// Either utilities
const map = <E, A, B>(
  either: Either<E, A>,
  fn: (value: A) => B
): Either<E, B> =>
  either.kind === 'right'
    ? right(fn(either.value))
    : either;
```

## TypeScript-Specific Considerations

### Type Inference
TypeScript's type inference works well with FP patterns, but explicit types often help readability:

```typescript
// Let TS infer
const numbers = [1, 2, 3].map(n => n * 2);  // number[]

// Explicit for clarity
const double = (n: number): number => n * 2;
const doubled: number[] = [1, 2, 3].map(double);
```

### Readonly Types
Use readonly types to enforce immutability:

```typescript
type Point = {
  readonly x: number;
  readonly y: number;
};

// or
type Point = Readonly<{
  x: number;
  y: number;
}>;

// Readonly arrays
const numbers: ReadonlyArray<number> = [1, 2, 3];
// or
const numbers: readonly number[] = [1, 2, 3];
```

### Function Type Utilities
TypeScript provides useful utility types for function types:

```typescript
// Extract parameter types
type Parameters<T extends (...args: any) => any>

// Extract return type
type ReturnType<T extends (...args: any) => any>

// Make all properties optional
type Partial<T>

// Make all properties required
type Required<T>

// Make all properties readonly
type Readonly<T>
```

### Advanced Type Features
Leverage TypeScript's type system for safer FP:

```typescript
// Discriminated unions
type Action = 
  | { type: 'INCREMENT'; payload: number }
  | { type: 'DECREMENT'; payload: number };

// Generic constraints
const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => 
  obj[key];

// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;
```

## Common Patterns

### Pipeline Pattern
Chain operations in a readable way:

```typescript
const pipe = <T>(...fns: Array<(arg: T) => T>) =>
  (value: T): T =>
    fns.reduce((acc, fn) => fn(acc), value);

// Usage
const process = pipe(
  (n: number) => n + 1,
  (n: number) => n * 2,
  (n: number) => n.toString()
);
```

### Railway Pattern
Handle errors gracefully through the entire operation chain:

```typescript
type Result<E, A> = Either<E, A>;

const chain = <E, A, B>(
  result: Result<E, A>,
  fn: (value: A) => Result<E, B>
): Result<E, B> =>
  result.kind === 'right'
    ? fn(result.value)
    : result;

// Usage
const divide = (a: number, b: number): Result<string, number> =>
  b === 0
    ? left('Division by zero')
    : right(a / b);
```

### Lens Pattern
Access and modify nested data structures immutably:

```typescript
type Lens<S, A> = {
  get: (s: S) => A;
  set: (a: A, s: S) => S;
};

const composeLens = <S, A, B>(
  l1: Lens<S, A>,
  l2: Lens<A, B>
): Lens<S, B> => ({
  get: (s: S) => l2.get(l1.get(s)),
  set: (b: B, s: S) => l1.set(l2.set(b, l1.get(s)), s)
});
```
