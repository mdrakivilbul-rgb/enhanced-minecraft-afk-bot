# Enhanced Minecraft AFK Bot - Setup Instructions

## Quick Start

### 1. Download and Setup
```bash
git clone https://github.com/mdrakivilbul-rgb/enhanced-minecraft-afk-bot.git
cd enhanced-minecraft-afk-bot
```

### 2. Configure Bot Settings
Edit `settings.json` with your bot account details:
```json
{
  "bot-account": {
    "username": "YourBotUsername",
    "password": "YourPassword",
    "type": "mojang"
  }
}
```

### 3. Start the Bot
```bash
./start.sh
```

## Features Overview

### 🤖 AI Movement System
- **Random Movement**: Bot moves randomly to avoid detection
- **Smart Actions**: Jumping, sneaking, sprinting, attacking
- **Anti-Detection**: Unpredictable behavior patterns
- **Pathfinding**: Intelligent navigation

### 🔄 24/7 Operation
- **Auto-Reconnect**: Automatically reconnects if disconnected
- **PM2 Management**: Process management for continuous operation
- **Error Recovery**: Robust error handling

### 📊 Web Monitoring
- **Real-time Dashboard**: Live bot status at http://localhost:8000
- **Game Stats**: Health, food, position tracking
- **Activity Log**: Real-time activity monitoring
- **Auto-refresh**: Updates every 5 seconds

## Commands for 24/7 Operation

### Start Bot
```bash
./start.sh
# or manually:
pm2 start ecosystem.config.js
```

### Monitor Bot
```bash
pm2 monit                    # Interactive monitoring
pm2 status                   # Quick status check
pm2 logs minecraft-afk-bot   # View logs
```

### Control Bot
```bash
pm2 restart minecraft-afk-bot  # Restart bot
pm2 stop minecraft-afk-bot     # Stop bot
pm2 delete minecraft-afk-bot   # Remove from PM2
```

### Auto-start on System Boot
```bash
pm2 startup                    # Generate startup script
pm2 save                       # Save current PM2 processes
```

## Configuration Options

### Anti-AFK Settings
```json
"anti-afk": {
  "enabled": true,
  "sneak": true,
  "action-interval": 5000  // Time between actions (ms)
}
```

### Auto-Reconnect Settings
```json
"auto-reconnect": true,
"auto-recconect-delay": 5000  // Delay before reconnect (ms)
```

### Chat Messages (Optional)
```json
"chat-messages": {
  "enabled": false,
  "repeat": true,
  "repeat-delay": 60,
  "messages": ["I'm active", "Hello server"]
}
```

## Server Information

**Default Server**: rakibul966222.aternos.me:31444
- The bot is pre-configured for this server
- Change server details in `settings.json` if needed

## Monitoring Dashboard

Access the web dashboard at: **http://localhost:8000**

Features:
- Real-time bot status (online/offline)
- Current activity and actions
- Game statistics (health, food, position)
- Connection information and reconnect count
- Activity log with timestamps

## Troubleshooting

### Bot Won't Connect
1. Check server IP and port in `settings.json`
2. Verify Minecraft account credentials
3. Ensure server is online

### Bot Gets Kicked
1. Adjust `action-interval` in settings (increase value)
2. Check server's anti-AFK rules
3. Ensure bot username is allowed on server

### Web Interface Not Working
1. Check if port 8000 is available
2. Ensure bot is running
3. Try accessing http://localhost:8000

### PM2 Issues
```bash
pm2 kill        # Kill PM2 daemon
pm2 resurrect   # Restore saved processes
```

## Advanced Usage

### Custom Actions
Modify the `actions` array in `index.js` to add custom behaviors:
```javascript
const actions = ['jump', 'sneak', 'sprint', 'attack', 'placeBlock'];
```

### Logging
- Console logs: `pm2 logs minecraft-afk-bot`
- Log files: `./logs/` directory
- Web dashboard activity log

### Multiple Bots
1. Copy the bot directory
2. Change bot account in `settings.json`
3. Modify port in `index.js` (change 8000 to another port)
4. Start with different PM2 app name

## Security Notes

- Keep your Minecraft account credentials secure
- Don't share your `settings.json` file
- Use dedicated bot accounts, not your main account
- Respect server rules and terms of service

## Support

For issues:
1. Check this documentation
2. Review GitHub repository issues
3. Check server console logs with `pm2 logs`

---

**Happy Mining! ⛏️**

Repository: https://github.com/mdrakivilbul-rgb/enhanced-minecraft-afk-bot

