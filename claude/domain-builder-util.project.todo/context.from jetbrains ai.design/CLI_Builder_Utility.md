# CLI Builder Utility

## Overview

The **CLI Builder Utility** is a Node.js library that allows you to define **domain-specific CLI tools**
programmatically using a JSON-like DSL (Domain-Specific Language). With this utility, you can:

- Create symbolic mappings between commands (input) and actions (output behavior).
- Define **static resolvers** (predefined outputs like folder paths).
- Define **dynamic resolvers** (functions that resolve values or execute actions at runtime).
- Generate CLI interpreters dynamically without hardcoding CLI logic.

---

## Why Use a CLI Utility?

Building dynamic, tailored CLI tools can be **tedious and repetitive**. By encapsulating the CLI configuration and logic
into reusable schemas, this utility:

- Reduces boilerplate code.
- Simplifies workflows for building CLI tools.
- Provides a foundation for integrating these configurations into services like GraphQL.

---

## Key Features

1. **JSON-Like CLI Definitions**:
   Define CLI commands, symbols, and resolvers in a simple, portable structure.

2. **Static and Dynamic Resolvers**:
    - **Static**: Commands resolve to predefined strings.
    - **Dynamic**: Commands compute or execute logic dynamically.

3. **Composable CLI Commands**:
    - Organize commands into reusable configurations.
    - Tailor commands for specific use cases (e.g., folder structure management, workflow automation).

---

## How It Works (High Level)

1. Define CLI commands and resolvers using a JSON/JS object schema.
2. Use the **CLI Builder Utility** to validate and build the CLI.
3. Execute the generated CLI tool in your terminal.

---

## Roadmap

This utility will later serve as a foundation for:

1. Integrating CLI definitions into GraphQL and other APIs.
2. Adding support for CLI chaining, rich output (e.g., tables), and REPLs.
3. Building CLI tools that execute workflows across APIs and local systems.