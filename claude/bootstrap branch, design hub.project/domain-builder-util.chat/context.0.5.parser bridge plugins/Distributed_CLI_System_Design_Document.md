# **Distributed CLI System with Translator Plugins**

## **1. Overview**

This document introduces a **community-friendly approach** to designing a Distributed CLI System by integrating *
*translator plugins**. Instead of relying solely on fallbacks, translator plugins mediate between nodes with different
parsers or plugin configurations to ensure interoperability.

---

## **2. Design Goals**

1. **Interoperability Across Nodes**:  
   Enable communication between distributed nodes using different parsers by employing translator plugins.

2. **Extensibility Through Community Contributions**:  
   Allow community developers to implement and provide translator plugins for popular parser formats.

3. **Resiliency via Translation**:  
   Reduce system-wide failures by translating commands or outputs into mutually compatible formats.

4. **Enhance Collaboration**:  
   Leverage translators so nodes with diverse plugin ecosystems can work together seamlessly.

---

## **3. Architecture Overview**

### **3.1 System Components**

- **Global Schema (`global-schema.json`)**:  
  Defines all plugins, translator plugins, and supported command translations.

- **Parser Plugins**:  
  Handle custom input parsing and command execution.

- **Translator Plugins**:  
  Mediate between different parsers by converting commands or outputs between compatible formats.

- **Core CLI Engine (`cli-core.js`)**:  
  Routes commands to parsers or translator plugins based on the source and target formats.

---

### **3.2 System Behavior**

1. **Normal Execution**:
    - When nodes or users use compatible parsers, the system directly executes the command via the appropriate plugin.

2. **Translation via Plugins**:
    - When an input must be processed by a parser unavailable on a node, the system queries available translator plugins
      to convert the input into a compatible format.

3. **Standardized Outputs**:
    - All outputs, whether executed or translated, are serialized in a standard format (e.g., JSON).

---

## **4. Updated Schema for Translation Plugins**

The `global-schema.json` is extended to include:

1. **Translators**:  
   Configurations for translator plugins, specifying:
    - Input format.
    - Output format.
    - Translation resolver.

2. **Node Capabilities**:  
   Nodes can advertise supported parsers and translators during handshake communication.

---

#### Example: Updated `global-schema.json`

```json
{
  "name": "Distributed-CLI",
  "description": "A CLI system with translator plugins for distributed interoperability",
  "parsers": [
    {
      "name": "jsonParser",
      "plugin": "espree",
      "description": "Handles JSON commands",
      "commands": {
        "parseJson": {
          "arguments": ["jsonData"],
          "resolver": "jsonParser.parse"
        }
      }
    },
    {
      "name": "customDSLParser",
      "plugin": "chevrotain",
      "description": "Handles a custom DSL for advanced workflows",
      "commands": {
        "customCommand": {
          "arguments": ["arg1", "arg2"],
          "resolver": "customDSLParser.handleCommand"
        }
      }
    }
  ],
  "translators": [
    {
      "name": "jsonToDSLTranslator",
      "description": "Translates JSON commands to a custom DSL",
      "sourceFormat": "json",
      "targetFormat": "customDSL",
      "resolver": "translators.jsonToDSLTranslator.translate"
    },
    {
      "name": "dslToJsonTranslator",
      "description": "Translates custom DSL commands to JSON",
      "sourceFormat": "customDSL",
      "targetFormat": "json",
      "resolver": "translators.dslToJsonTranslator.translate"
    }
  ]
}
```

---

## **5. Implementation Plan**

### **5.1 Translator Plugin Structure**

1. **Responsibilities of Translator Plugins**:
    - Validate the source command format.
    - Translate commands into the target format.
    - Return translated commands for further processing.

2. **Use Case**:  
   If **Node A** uses `jsonParser` and **Node B** uses `customDSLParser`, a translator plugin such as
   `jsonToDSLTranslator` would:
    - Convert JSON to the custom DSL understood by `Node B`.
    - Ensure responses from `Node B` are translated back into JSON for `Node A`.

---

### **5.2 Example Translator Plugins**

#### 1. JSON to DSL Translator (`translators/jsonToDSLTranslator.js`)

```javascript
module.exports = {
  translate: (jsonInput) => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      // Convert JSON structure into custom DSL string
      const customDSL = `add ${parsedJson.arg1} ${parsedJson.arg2}`;
      return customDSL;
    } catch (err) {
      throw new Error("Translation failed: Invalid JSON");
    }
  }
};
```

---

#### 2. DSL to JSON Translator (`translators/dslToJsonTranslator.js`)

```javascript
module.exports = {
  translate: (dslInput) => {
    try {
      // Parse DSL command into JSON-compatible format
      const tokens = dslInput.split(" ");
      if (tokens[0] === "add" && tokens.length === 3) {
        return JSON.stringify({
          command: "add",
          arg1: parseInt(tokens[1], 10),
          arg2: parseInt(tokens[2], 10)
        });
      }
      throw new Error("Invalid DSL command");
    } catch (err) {
      throw new Error("Translation failed: Invalid DSL");
    }
  }
};
```

---

### **5.3 Core CLI Execution Pipeline**

The CLI pipeline is extended to dynamically route commands through translator plugins if necessary.

#### Updated `cli-core.js`

```javascript
// Load Schema
const schema = require("./global-schema.json");

// Load Parsers and Translators
const parsers = {};
const translators = {};

// Initialize Parsers
for (const parserConfig of schema.parsers) {
  try {
    const parser = require(`./plugins/${parserConfig.name}`);
    parsers[parserConfig.name] = parser;
  } catch (err) {
    console.error(`Parser plugin ${parserConfig.name} not found.`);
  }
}

// Initialize Translators
for (const translatorConfig of schema.translators) {
  try {
    const translator = require(`./${translatorConfig.resolver.split(".")[0]}`);
    translators[translatorConfig.name] = translator;
  } catch (err) {
    console.error(`Translator plugin ${translatorConfig.name} not found.`);
  }
}

// Unified CLI Command Executor
const executeCommand = (commandVerb, args, sourceFormat, targetFormat) => {
  // If source and target formats are the same, process with the parser
  if (sourceFormat === targetFormat) {
    const parser = Object.values(parsers).find((parser) => parser.commands[commandVerb]);
    if (!parser) throw new Error(`No parser found for command: ${commandVerb}`);
    return parser.commands[commandVerb].resolver(...args);
  }

  // Attempt Translation
  const translator = Object.values(translators).find(
    (translator) => translator.sourceFormat === sourceFormat && translator.targetFormat === targetFormat
  );

  if (!translator) throw new Error(`No translator available for ${sourceFormat} to ${targetFormat}`);

  // Translate and Execute
  const translatedCommand = translator.translate(args[0]);
  return executeCommand(commandVerb, [translatedCommand], targetFormat, targetFormat);
};

// CLI Input Example
const inputCommand = "add 1 2";
const sourceFormat = "json"; // From this input format
const targetFormat = "customDSL"; // Target parser format

try {
  const output = executeCommand("parseJson", [inputCommand], sourceFormat, targetFormat);
  console.log("Output:", output);
} catch (err) {
  console.error(err.message);
}
```

---

## **6. Benefits of Translator Plugins**

1. **Flexible Interoperability**:  
   Nodes with different parser plugins can still collaborate effectively by translating commands between formats.

2. **Community-Driven Extensibility**:  
   Enables community developers to contribute translator plugins, enriching the ecosystem.

3. **Distributed Coverage**:  
   Translator plugins reduce reliance on centralized plugin alignment, allowing nodes to work independently with minimal
   friction.

4. **Resiliency**:  
   Ensures commands execute even when the system spans mixed parser ecosystems.

---

## **7. Future Enhancements**

1. **Dynamic Translator Discovery**:  
   Nodes could dynamically broadcast and discover available translator plugins.

2. **Caching Translations**:  
   Frequently used translations can be cached to boost performance.

3. **Translator Chains**:  
   For complex setups, allow chaining multiple translator plugins (e.g., JSON → DSL → XML).

---

## **8. Conclusion**

The introduction of translator plugins fosters:

- Community engagement.
- Greater compatibility for distributed nodes.
- A robust and scalable system that can handle diverse requirements in real-world environments.

This approach ensures the CLI system becomes widely adoptable and resilient, making it ideal for resource-constrained
distributed environments.