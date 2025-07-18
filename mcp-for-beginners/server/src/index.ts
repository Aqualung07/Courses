import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp";
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
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

// Start receiving messages over HTTP
// Stateless mode - explicitly set session ID to undefined
const statelessTransport = new StreamableHTTPServerTransport({
  sessionIdGenerator: undefined,
});

await server.connect(statelessTransport);