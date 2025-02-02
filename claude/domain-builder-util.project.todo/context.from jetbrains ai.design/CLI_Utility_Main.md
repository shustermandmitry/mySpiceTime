# Implementation Overview

## Introduction

The CLI Builder Utility is designed to simplify the process of creating custom CLI tools. This document provides an *
*in-depth overview of the codebase**, including its core components, entry points, and how they interact to build and
execute CLI tools.

---

## Core Components

### 1. Schema Validator (`validator.js`)

- **Purpose**: Ensures the CLI definition (schema) is valid.
- **Responsibility**:
    - Check that the schema adheres to the required structure.
    - Report errors if any required fields are missing or misconfigured.
- **Input**: A `CLI schema` defined in JSON-like format.
- **Output**: A list of validation errors (if any).

---

### 2. CLI Builder (`builder.js`)

- **Purpose**: Generates a Node.js executable file (`.js`) from the validated CLI schema.
- **Responsibility**:
    - Parse the schema and dynamically generate code for CLI commands.
    - Write the generated CLI interpreter to a file.
- **Input**: A validated `CLI schema`.
- **Output**: A CLI executable file (e.g., `FolderBoundCLI.js`).

---

### 3. CLI Runtime (`runtime.js`)

- **Purpose**: Provides the runtime logic for executing commands defined in the CLI.
- **Responsibility**:
    - Accept user input (command and arguments).
    - Resolve the appropriate command logic (static or dynamic).
- **Input**: User-supplied command or symbol.
- **Output**: The corresponding resolved value or action result.

---

### 4. Main Utility (`index.js`)

- **Purpose**: Acts as the entry point for the library.
- **Responsibility**:
    - Serve as the API for defining and generating CLI tools.
    - Integrate the Schema Validator, CLI Builder, and Runtime.
- **Input/Output**: Entire workflow coordination for CLI creation.

---

## File Structure

Here’s the project structure and a brief description of important files.

```plaintext
src/
├── index.js           # Main entry point for the utility.
├── validator.js       # Validates the CLI schema structure.
├── builder.js         # Generates the CLI interpreter dynamically.
├── runtime.js         # Command execution layer.
└── examples/          # Example CLI definitions.
    ├── folder-bound/  # Folder-bound CLI example.
```

---

## Workflow Pipeline

### Step 1: CLI Schema Validation

The schema is passed to the `validator.js` module, where it undergoes structural and type checks.

#### Example Validation Rules

- `name` must be a non-empty string.
- Each command must include a `symbol` and a valid `resolver`.

---

### Step 2: CLI Builder

The results from the validation phase are passed to the `builder.js` module. This module:

- Loops through the `commands` array.
- Dynamically generates CLI command logic for static and dynamic resolvers.
- Writes the output to a CLI script.

---

### Step 3: CLI Execution (Runtime)

At runtime, the user invokes commands via CLI symbols. The `runtime.js` layer parses the invoked command and:

- Matches it to the appropriate `resolver`.
- Computes and logs the final output.

---

## Code Overview

### 1. Main Utility (`src/index.js`)

This is the entry point for the library.

```javascript
const { validateCLIConfig } = require("./validator");
const { buildCLIExecutable } = require("./builder");

/**
 * Main CLI Utility Class
 */
class CLIUtility {
  constructor(config) {
    this.config = config;
    this.isValidated = false;
  }

  /**
   * Validate the CLI schema.
   * Throws an error if validation fails.
   */
  validate() {
    const errors = validateCLIConfig(this.config);
    if (errors.length > 0) {
      throw new Error(`Validation failed:\n${errors.join("\n")}`);
    }
    this.isValidated = true;
  }

  /**
   * Generate the CLI interpreter.
   */
  generate() {
    if (!this.isValidated) {
      this.validate();
    }
    buildCLIExecutable(this.config);
  }
}

module.exports = CLIUtility;
```

---

### 2. CLI Schema Validation (`src/validator.js`)

This module ensures the schema matches expected properties.

```javascript
/**
 * Validate the structure of the CLI schema.
 */
function validateCLIConfig(config) {
  const errors = [];

  // Validate top-level properties
  if (!config.name || typeof config.name !== "string") {
    errors.push("`name` is required and must be a string.");
  }

  if (!Array.isArray(config.commands)) {
    errors.push("`commands` must be an array.");
  } else {
    // Validate commands
    config.commands.forEach((cmd, index) => {
      if (!cmd.symbol || typeof cmd.symbol !== "string") {
        errors.push(`Command ${index + 1}: 'symbol' is required and must be a string.`);
      }
      if (!cmd.resolver || !(typeof cmd.resolver === "string" || typeof cmd.resolver === "function")) {
        errors.push(
          `Command ${index + 1}: 'resolver' is required and must be a string or function.`
        );
      }
    });
  }

  return errors;
}

module.exports = { validateCLIConfig };
```

### 3. CLI Builder (`src/builder.js`)

Creates the CLI interpreter dynamically.

```javascript
const fs = require("fs");
const path = require("path");

/**
 * Build a CLI interpreter from the provided schema.
 */
function buildCLIExecutable(config) {
  const cliFilePath = path.join(process.cwd(), `${config.name}.js`);

  const cliCode = `
#!/usr/bin/env node
const { program } = require("commander");

program.name("${config.name}").description("${config.description || ""}");

// Define commands dynamically
${config.commands
  .map((cmd) => {
    if (typeof cmd.resolver === "string") {
      // Static resolver
      return `
program.command("${cmd.symbol}")
  .description("${cmd.description || ""}")
  .action(() => {
    console.log("${cmd.resolver}");
  });
`;
    } else if (typeof cmd.resolver === "function") {
      // Dynamic resolver
      return `
program.command("${cmd.symbol}")
  .description("${cmd.description || ""}")
  .action(() => {
    const result = (${cmd.resolver.toString()})();
    console.log(result);
  });
`;
    }
  })
  .join("")}

program.parse(process.argv);
`;

  fs.writeFileSync(cliFilePath, cliCode, "utf8");
  fs.chmodSync(cliFilePath, "755");
  console.log(`Generated CLI executable at ${cliFilePath}`);
}

module.exports = { buildCLIExecutable };
```

---

## Extensibility

### Supported Features

1. **Static Resolvers**: Easily bind commands to predefined outputs.
2. **Dynamic Resolvers**: Handle real-time logic with functions.

### Future Enhancements

1. Add **argument parsing and flags**.
2. Generate **interactive commands** (e.g., prompts).
3. Adapt the utility for **GraphQL schema generation**.

---

## Testing the CLI Utility

1. Define your CLI schema (use `examples/`).
2. Use `cli.generate()` to validate and build the CLI executable.
3. Invoke commands using symbols (e.g., `@project`, `@src`).

---

Let me know if you'd like details for **`examples.md` (examples-focused implementation)** next! 🚀