import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport";
import OpenAI from "openai";
import readline from "readline";
import { displayLoading } from "./utils.js";
import { logInfo, logSuccess, logWarning, logError } from "./logger.js";

export default class McpAIClient {
    private openAiClient: OpenAI;
    private mcpLlmClient: Client;

    get getOpenAiClient(): OpenAI {
        return this.openAiClient;
    }

    get getMcpLlmClient(): Client {
        return this.mcpLlmClient;
    }

    constructor() {
        const openaiApiUrl = process.env.OPEN_AI_SERVER_URL;
        const openaiApiKey = process.env.OPEN_AI_API_KEY;

        logInfo(`🌐 OpenAI URL: ${openaiApiUrl}`);
        logInfo(`🔑 OpenAI API Key: ${openaiApiKey ? "Loaded ✅" : "Not Set ❌"}`);

        this.openAiClient = new OpenAI({
            baseURL: openaiApiUrl,
            apiKey: openaiApiKey
        });

        this.mcpLlmClient = new Client(
            {
                name: "example-client",
                version: "1.0.0"
            },
            {
                capabilities: {
                    prompts: {},
                    resources: {},
                    tools: {}
                }
            }
        );
    }

    async connectToServer(transport: Transport) {
        await this.mcpLlmClient.connect(transport);
        logSuccess("🔗 MCP client connected via stdio");
        this.run();
    }

    async run() {
        logInfo("📡 Asking server for available tools...");

        const toolsResult = await this.mcpLlmClient.listTools();
        logSuccess(`🧰 Received ${toolsResult.tools.length} tools from server`);

        const tools = toolsResult.tools.map((tool) => {
            return this.openAiToolAdapter({
                name: tool.name,
                description: tool.description,
                input_schema: tool.inputSchema,
            });
        });

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        const prompt = await new Promise<string>((resolve) => {
            rl.question("💬 Enter your prompt: ", (answer) => {
                rl.close();
                resolve(answer);
            });
        });

        const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            {
                role: "user",
                content: prompt,
            },
        ];

        const stopLoading = displayLoading("🤖 Querying LLM...");

        try {
            const response = await this.openAiClient.chat.completions.create({
                model: "gpt-4o-mini",
                max_tokens: 1000,
                messages,
                tools: tools,
            });

            stopLoading();

            const results: any[] = [];

            response.choices.map(async (choice: { message: any }) => {
                const message = choice.message;
                if (message.tool_calls) {
                    logInfo("🛠 Making tool call(s)...");
                    await this.callTools(message.tool_calls, results);
                }
            });

        } catch (err) {
            stopLoading();
            logError(`❌ Error querying OpenAI: ${err}`);
        }
    }

    async callTools(
        tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
        toolResults: any[]
    ) {
        for (const tool_call of tool_calls) {
            const toolName = tool_call.function.name;
            const args = tool_call.function.arguments;

            logInfo(`🧪 Calling tool ${toolName} with args: ${args}`);

            try {
                const toolResult = await this.mcpLlmClient.callTool({
                    name: toolName,
                    arguments: JSON.parse(args),
                });

                logSuccess(`📦 Tool result: ${JSON.stringify(toolResult)}`);
                toolResults.push(toolResult);
            } catch (err) {
                logError(`❌ Error calling tool ${toolName}: ${err}`);
            }
        }
    }

    private openAiToolAdapter(tool: {
        name: string;
        description?: string;
        input_schema: any;
    }) {
        return {
            type: "function" as const,
            function: {
                name: tool.name,
                description: tool.description,
                parameters: {
                    type: "object",
                    properties: tool.input_schema.properties,
                    required: tool.input_schema.required,
                },
            },
        };
    }
}
