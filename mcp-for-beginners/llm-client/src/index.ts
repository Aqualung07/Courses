import dotenv from "dotenv";
import McpAIClient from "./llm-client.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

dotenv.config();

const client = new McpAIClient();

const transport = new StdioClientTransport({
    command: "bash",
    args: [process.cwd() + "/../server/scripts/run.sh"]
});

client.connectToServer(transport);

