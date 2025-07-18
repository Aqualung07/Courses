import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import readline from "readline";
import { z } from "zod";

const transport = new StdioClientTransport({
    command: "bash",
    args: [process.cwd() + "/../server/scripts/run.sh"]
});

const client = new Client(
    {
        name: "example-client",
        version: "1.0.0"
    }
);

await client.connect(transport);


const ToolSchema = z.object({
    name: z.string(),
    title: z.string(),
    description: z.string(),
    inputSchema: z.object({
        properties: z.record(z.unknown())
    })
});

const ToolsArraySchema = z.array(ToolSchema);

const tools = Object.entries(await client.listTools())[0][1];

const parsedToolList = ToolsArraySchema.safeParse(tools);

if (parsedToolList.success) {
    console.log("Available tools:");
    let toolIndex = 0;
    const tools = parsedToolList.data;
    for (const tool of tools) {
        console.log(`${++toolIndex}: ${tool.name} - ${tool.description}`);
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Select a tool by number: ", async (toolIndex) => {
        const selectedTool = tools[parseInt(toolIndex) - 1];
        if (!selectedTool) {
            console.log("Invalid selection.");
            rl.close();
            return;
        }

        console.log(`You selected: ${selectedTool.name}`);
        let params = {};

        for (const param in selectedTool.inputSchema.properties) {
            await new Promise((resolve) => {
                rl.question(`Enter value for ${param}: `, (value) => {
                    params = {
                        ...params,
                        [param]: Number(value)
                    };
                    resolve(null);
                });
            });
        }

        try {
            const result = await client.callTool({ name: selectedTool.name, arguments: params });
            console.log("Tool result:", result.content);
        } catch (error) {
            console.error("Error calling tool:", error);
        }

        rl.close();
    });

} else {
    console.error("Invalid tools structure", parsedToolList.error);
    await client.close();
}