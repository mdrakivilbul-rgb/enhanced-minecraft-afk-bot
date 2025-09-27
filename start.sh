#!/bin/bash

# Enhanced Minecraft AFK Bot Startup Script
echo "Starting Enhanced Minecraft AFK Bot..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "PM2 is not installed. Installing PM2..."
    npm install -g pm2
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Create logs directory if it doesn't exist
mkdir -p logs

# Start the bot with PM2
echo "Starting bot with PM2..."
pm2 start ecosystem.config.js

# Show PM2 status
pm2 status

echo ""
echo "✅ Bot started successfully!"
echo "📊 Monitoring Dashboard: http://localhost:8000"
echo "📋 View logs: pm2 logs minecraft-afk-bot"
echo "🔄 Restart bot: pm2 restart minecraft-afk-bot"
echo "⏹️  Stop bot: pm2 stop minecraft-afk-bot"
echo ""
echo "🎮 Server: rakibul966222.aternos.me:31444"
echo "⚙️  Configure bot settings in settings.json"
echo ""

