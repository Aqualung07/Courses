#!/bin/bash

# Navigate to server directory
cd "$(dirname "$0")/.." || exit

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing server dependencies..."
    npm install
fi

# Build TypeScript
echo "Building server..."
npm run build

# Run the server
echo "Starting server..."
node dist/index.js
