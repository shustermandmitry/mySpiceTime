# Design Documentation for MyDSL (JavaScript-Like CLI DSL)

## 1. Overview

The CLI is a robust **domain-specific language (DSL)** inspired by JavaScript, designed to facilitate:

- **Variables and Constants**: Manage reusable data as variables (`@` syntax).
- **Functions (Verbs)**: Handle functional commands with arguments and options.
- **Objects with Prototypes**: Enable prototypical inheritance for object extensions.
- **Arrays**: Manipulate collections using functional verbs like `map`, `filter`, or `reduce`.
- **Command Composition**: Use chaining/piping (`|`) to build composed workflows.

This design ensures modularity, extensibility, and JavaScript-like behavior.

---

## 2. Core Concepts

### 2.1 Language Constructs

| **Construct**   | **Description**                                                                  |
|-----------------|----------------------------------------------------------------------------------|
| **Variables**   | Named constants prefixed by `@` that hold values (scalars, objects, or arrays).  |
| **Functions**   | Commands (verbs) responsible for data transformations and actions.               |
| **Objects**     | Structures formed as key-value pairs, with support for prototypical inheritance. |
| **Arrays**      | Ordered collections for functional-style operations (`map`, `filter`, etc.).     |
| **Composition** | Commands can be chained with pipes (`                                            |`) for functional workflows.          |

---

## 3. Schema Design

The schema is a **JSON structure** that defines the CLI's constructs:

```json
{
  "name": "CLI Name",
  "description": "Description of CLI",
  "variables": {}, // Global storage for variables/constants
  "commands": [],  // Defined verbs/actions
  "piping": {}     // Configuration for chaining commands
}
```

### 3.1 Variables (Constants)

Variables are named constants that store data for use across the CLI:

```json
"variables": {
  "@data": {
    "description": "An example object",
    "value": {
      "type": "object",
      "properties": {
        "name": "default",
        "value": 100
      }
    }
  },
  "@numbers": {
    "description": "An array of numbers",
    "value": [1, 2, 3, 4]
  }
}
```

### 3.2 Commands (Verbs)

Commands, specified as objects, define the actions (verbs) available in the CLI:

```json
"commands": [
  {
    "verb": "add",
    "description": "Add numbers together",
    "arguments": ["...nums"],
    "resolver": "function(...nums) { return nums.reduce((a, b) => a + b, 0); }"
  }
]
```

### 3.3 Piping (Functional Workflows)

Enables chaining commands:

```json
"piping": {
  "enabled": true,
  "delimiter": "|"
}
```

---

## 4. Execution Model

1. **Variable Resolution**:
    - Variables (`@var`) are substituted with their values (resolved dynamically).

2. **Command Execution**:
    - Each command processes inputs and provides outputs using its resolver.

3. **Piping**:
    - Chained commands pass outputs from one to the next.

4. **Inheritance**:
    - Objects support **prototypical inheritance** via `Object.create` or `Object.setPrototypeOf`.

---

## 5. Dependencies

### Core Libraries

- **commander.js**: For CLI command/argument parsing.
- JavaScript Core APIs:
    - Object Manipulation: `Object.create`, `Object.setPrototypeOf`.
    - Functional Programming: `Array.map`, `Array.reduce`.

---

## 6. Example Workflow

### Schema Declaration

```json
{
  "variables": {
    "@data": { "value": { "name": "test", "value": 100 } },
    "@list": { "value": [1, 2, 3] }
  },
  "commands": [
    {
      "verb": "add",
      "arguments": ["...nums"],
      "resolver": "function(...nums) { return nums.reduce((sum, n) => sum + n, 0); }"
    },
    {
      "verb": "mapValues",
      "arguments": ["@list", "callback"],
      "resolver": "function(list, callback) { return list.map(callback); }"
    }
  ]
}
```

### Terminal Commands

- Simple Addition:
  ```bash
  node myDSL.js add 10 20 30
  ```
- Command Chaining:
  ```bash
  node myDSL.js add 10 20 | mapValues @list "n => n * 2"
  ```

---

## Next Steps

1. **Extendable Commands**: Build custom resolvers and integrate external modules.
2. **Error Handling**: Add schema and runtime error validation.
3. **Interactive Debugging**: Support step-by-step command testing.