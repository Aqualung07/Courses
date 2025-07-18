#!/bin/bash

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build TypeScript
npm run build

# Run the server with inspector
npx @modelcontextprotocol/inspector node dist/index.js
