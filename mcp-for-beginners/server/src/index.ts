import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0"
});

// Add a calculator tool
server.registerTool("add",
  {
    title: "Add",
    description: "Performs basic addition",
    inputSchema: { a: z.number(), b: z.number() }
  },
  async ({ a, b }) => {
    console.log(`Received: a=${a}, b=${b}`);
    return {
      content: [{ type: "text", text: String(a + b) }]
    };
  }
);

const transport = new StdioServerTransport();

await server.connect(transport);