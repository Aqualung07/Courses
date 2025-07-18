# Model Context Protocol Demo

A simple Model Context Protocol (MCP) implementation in TypeScript that demonstrates client-server communication using the MCP SDK.

## Features

-   Basic addition calculator tool
-   Stdio transport for client-server communication
-   Built with MCP SDK
-   Type-safe schema validation using Zod
-   Interactive command-line interface

## Prerequisites

-   Node.js (v16 or higher)
-   npm
-   TypeScript knowledge

## Setup

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd mcp-for-beginners
    ```

2.  Install server dependencies:

    ```bash
    cd server && npm install
    ```

3.  Install client dependencies:

    ```bash
    cd client && npm install
    ```

4.  Build and start the server:

    ```bash
    cd server && npm start
    ```

5.  In a separate terminal, run the client:

    ```bash
    cd client && npm run client
    ```

## Development

For server development with hot-reload:

```bash
cd server && npm run server-dev
```

For inspecting server-client communication:

```bash
cd server && npm run inspect
```
