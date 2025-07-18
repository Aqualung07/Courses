#!/bin/bash

# Check if node_modules exists
if [ ! -d "./server/node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build TypeScript
npm run build

# Run the server with inspector
npx @modelcontextprotocol/inspector node ./server/dist/index.js