const {program} = require("commander");
const fs = require("fs");

// Load schema
const schema = require("./advancedSchema.json");
const {validateSchema} = require("./validator");

const variables = {...schema.variables}; // Store variables

// === Validate Schema ===
const errors = validateSchema(schema);
if (errors.length > 0) {
    console.error("Schema Validation Failed:", errors);
    process.exit(1);
} else {
    console.log("Schema is valid!");
}

/**
 * Resolve variables, expanding objects and arrays dynamically.
 */
const resolveVariable = (varName) => {
    const val = variables[varName]?.value; // Resolve static value
    if (val && val.type === "object" && val.prototype) {
        return Object.create(val.prototype, Object.getOwnPropertyDescriptors(val.properties || {}));
    }
    return val || varName;
};

// === Register Commands ===
schema.commands.forEach((cmd) => {
    const cliCommand = program.command(cmd.verb).description(cmd.description);

    // Add arguments
    if (cmd.arguments) {
        cmd.arguments.forEach((arg) => cliCommand.argument(`<${arg}>`));
    }

    // Add options
    if (cmd.options) {
        Object.entries(cmd.options).forEach(([key, desc]) => cliCommand.option(key, desc));
    }

    // Add action resolver
    cliCommand.action((...args) => {
        const options = args.pop(); // Extract options
        const inputs = args.map(resolveVariable); // Resolve variables or pass raw args

        try {
            const result = eval(cmd.resolver)(...inputs, options); // Dynamic evaluation
            variables["_result"] = result; // Piped result for chaining
            console.log(result);
        } catch (err) {
            console.error("Error in command execution:", err.message);
        }
    });
});

// === Handle Piping ===
(async function handlePiping() {
    const rawInput = process.argv.slice(2).join(" ");
    if (!schema.piping.enabled || !rawInput.includes(schema.piping.delimiter)) {
        program.parse(process.argv);
        return;
    }

    const commands = rawInput.split(schema.piping.delimiter).map((cmd) => cmd.trim());
    for (const cmd of commands) {
        const args = cmd.split(" ");
        await program.parseAsync(["node", ...args], {from: "user"});
    }
})();