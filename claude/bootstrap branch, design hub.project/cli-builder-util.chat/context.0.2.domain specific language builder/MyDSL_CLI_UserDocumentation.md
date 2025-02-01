# User Documentation for MyDSL

## 1. Introduction

Welcome to **MyDSL**, a JavaScript-inspired CLI tool for building dynamic workflows. MyDSL enables you to:

- Declare **variables** (constants) to reference dynamically across commands.
- Use **objects and arrays** for complex data structures.
- Execute **functions (verbs)** for custom data manipulation.
- Chain commands using pipes (`|`) for functional workflows.

---

## 2. Installation

Install dependencies by running:

```bash
pnpm install
```

Add your custom schema as a **JSON file** (e.g., `mySchema.json`) in the project directory.

---

## 3. Usage

### 3.1 Help Menu

View the CLI's help menu:

```bash
node myDSL.js --help
```

### 3.2 Variables

Define variables (constants) in your schema:

```json
"variables": {
  "@input": { "value": "input.txt" },
  "@numbers": { "value": [1, 2, 3, 4] }
}
```

Reference them in commands:

```bash
node myDSL.js add @numbers
```

---

## 4. Commands

### 4.1 Defining Commands

Commands are defined in the **commands** section of the schema:

```json
{
  "verb": "add",
  "arguments": ["...nums"],
  "resolver": "function(...nums) { return nums.reduce((sum, n) => sum + n, 0); }"
}
```

Run this command:

```bash
node myDSL.js add 10 20 30
```

**Output**:

```bash
60
```

### 4.2 Composition

Chain commands together with pipes (`|`):

```bash
node myDSL.js add 10 20 | mapValues @numbers "n => n * 2"
```

### 4.3 Objects and Prototypes

Easily extend objects in workflows:

```bash
"commands": [
  {
    "verb": "extend",
    "arguments": ["target", "prototype"],
    "resolver": "function(target, prototype) { return Object.setPrototypeOf(target, prototype); }"
  }
]
```

Run the command:

```bash
node myDSL.js extend @data { "extra": "value" }
```

---

## 5. Example Use Cases

### Example 1: Simple Workflow

```bash
node myDSL.js add 10 20 30
```

### Example 2: Complex Workflow with Arrays

```bash
node myDSL.js add @numbers | mapValues _result "n => n * 2"
```

### Example 3: Object Manipulations

```bash
node myDSL.js extend @data { "newKey": "newValue" }
```

---

## 6. Extending the System

Add new commands to `mySchema.json`:

```json
{
  "verb": "multiply",
  "arguments": ["x", "y"],
  "resolver": "function(x, y) { return x * y; }"
}
```

Run the new command:

```bash
node myDSL.js multiply 5 6
```

---

## 7. Troubleshooting

- Validate the schema with linting tools before running.
- For command errors, check the schema resolver for correct syntax.

---

## 8. Contributions

Feel free to extend the schema and share custom workflows with the community.