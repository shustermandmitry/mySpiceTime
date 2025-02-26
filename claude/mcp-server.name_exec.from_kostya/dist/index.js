#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, ToolSchema } from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { exec } from "child_process";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
// Command line argument parsing
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error("Usage: mcp-server <allowed-directory> [additional-directories...]");
    process.exit(1);
}
const allowedDirectories = args.map(dir => path.resolve(os.homedir(), dir));
const ToolInputSchema = ToolSchema.shape.inputSchema;
// Validate directories
await Promise.all(allowedDirectories.map(async (dir) => {
    try {
        const stats = await fs.stat(dir);
        if (!stats.isDirectory()) {
            console.error(`Error: ${dir} is not a directory`);
            process.exit(1);
        }
    }
    catch (error) {
        console.error(`Error accessing directory ${dir}:`, error);
        process.exit(1);
    }
}));
async function validatePath(requestedPath) {
    const absolutePath = path.resolve(requestedPath);
    if (!allowedDirectories.some(dir => absolutePath.startsWith(dir))) {
        throw new Error(`Access denied: ${absolutePath} is outside allowed directories.`);
    }
    return absolutePath;
}
const ExecuteCommandArgsSchema = z.object({
    path: z.string(),
    command: z.string(),
});
async function executeCommand(path, command) {
    const validPath = await validatePath(path);
    return new Promise((resolve, reject) => {
        exec(command, { cwd: validPath }, (error, stdout, stderr) => {
            const result = { stdout: stdout.trim(), stderr: stderr.trim() };
            logCommandExecution(validPath, command, result.stdout, result.stderr);
            error ? reject(result) : resolve(result);
        });
    });
}
function logCommandExecution(path, command, stdout, stderr) {
    const logEntry = `[${new Date().toISOString()}]\nPath: ${path}\nCommand: ${command}\nSTDOUT: ${stdout || "None"}\nSTDERR: ${stderr || "None"}\n`;
    fs.appendFile("command_execution.log", logEntry).catch(err => console.error("Logging failed:", err));
}
const server = new Server({ name: "mcp-server", version: "1.0.0" }, { capabilities: { tools: {} } });
server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
        {
            name: "execute_command",
            description: "Execute a shell command securely inside an allowed directory. Captures both STDOUT and STDERR.",
            inputSchema: zodToJsonSchema(ExecuteCommandArgsSchema),
        },
    ],
}));
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    switch (name) {
        case "execute_command": {
            const parsed = ExecuteCommandArgsSchema.safeParse(args);
            if (!parsed.success) {
                throw new Error(`Invalid arguments: ${parsed.error}`);
            }
            try {
                const { stdout, stderr } = await executeCommand(parsed.data.path, parsed.data.command);
                return { content: [
                        { type: "text", text: `STDOUT:\n${stdout || "None"}` },
                        { type: "text", text: `STDERR:\n${stderr || "None"}` },
                    ] };
            }
            catch (err) {
                const { stdout, stderr } = err;
                return { content: [
                        { type: "text", text: `STDOUT:\n${stdout || "None"}` },
                        { type: "text", text: `STDERR:\n${stderr || "None"}` },
                    ], isError: true };
            }
        }
        default:
            throw new Error(`Unknown tool: ${name}`);
    }
});
async function runServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("MCP Server running");
}
runServer().catch(error => {
    console.error("Fatal error running server:", error);
    process.exit(1);
});
