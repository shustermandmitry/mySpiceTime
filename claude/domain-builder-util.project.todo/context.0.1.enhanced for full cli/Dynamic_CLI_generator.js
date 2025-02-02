const {program} = require("commander");
const fs = require("fs");

const cliSchema = require("./schema"); // Load the enhanced CLI schema

const variables = {}; // Store variable values during execution

// Register commands dynamically from the schema
cliSchema.commands.forEach((cmd) => {
    const cliCommand = program
        .command(cmd.verb)
        .description(cmd.description);

    // Add arguments
    if (cmd.arguments) {
        cmd.arguments.forEach((arg) => cliCommand.argument(`<${arg}>`));
    }

    // Add options
    if (cmd.options) {
        Object.entries(cmd.options).forEach(([flag, desc]) => {
            cliCommand.option(flag, desc);
        });
    }

    // Define action to resolve the command
    cliCommand.action(async (...args) => {
        const options = args.pop(); // Extract options
        const commandInputs = args.map((arg) => variables[arg] || arg); // Resolve variables

        const result = cmd.resolver
            ? cmd.resolver(...commandInputs, options)
            : null;

        // Store results for piping
        if (cliSchema.piping.enabled) {
            variables["_result"] = result; // Temporary storage for piping
        } else {
            console.log(result);
        }
    });
});

// Handle piping
program.parseAsync(processInput());

/**
 * Parse and handle piped input.
 */
async function processInput() {
    const userInput = process.argv.slice(2).join(" ");
    if (!cliSchema.piping.enabled || !userInput.includes(cliSchema.piping.delimiter)) {
        return process.argv;
    }

    // Split commands by the delimiter
    const commands = userInput.split(cliSchema.piping.delimiter).map((cmd) => cmd.trim());

    // Run commands sequentially
    for (const command of commands) {
        const args = command.split(" ");
        await program.parseAsync(["node", ...args], {from: "user"});
    }

    return process.exit(0);
}