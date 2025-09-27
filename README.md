# Enhanced Minecraft AFK Bot

An advanced Minecraft AFK bot with AI-powered movement, anti-detection features, 24/7 operation, and real-time web monitoring.

## Features

### 🤖 AI Movement System
- **Random Movement**: Bot moves randomly around the spawn area to avoid detection
- **Smart Actions**: Performs various actions like jumping, sneaking, sprinting, and block interactions
- **Anti-Detection**: Unpredictable behavior patterns to avoid server anti-AFK systems
- **Pathfinding**: Uses mineflayer-pathfinder for intelligent navigation

### 🔄 24/7 Operation
- **Auto-Reconnect**: Automatically reconnects if disconnected from server
- **Process Management**: PM2 configuration for continuous operation
- **Error Handling**: Robust error handling and recovery mechanisms
- **Logging**: Comprehensive logging system for monitoring

### 📊 Web Monitoring Dashboard
- **Real-time Status**: Live bot status monitoring via web interface
- **Game Stats**: Health, food, position tracking
- **Activity Log**: Real-time activity logging
- **Beautiful UI**: Modern, responsive web interface
- **Auto-refresh**: Updates every 5 seconds automatically

### 🛡️ Anti-Detection Features
- **Variable Timing**: Random intervals between actions
- **Multiple Actions**: Diverse set of actions to mimic human behavior
- **Smart Positioning**: Intelligent movement patterns
- **No Fixed Patterns**: Avoids predictable behavior

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mdrakivilbul-rgb/enhanced-minecraft-afk-bot.git
   cd enhanced-minecraft-afk-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install PM2 globally (for 24/7 operation)**
   ```bash
   npm install -g pm2
   ```

4. **Configure the bot**
   Edit `settings.json` with your server details and bot account:
   ```json
   {
     "bot-account": {
       "username": "YourBotUsername",
       "password": "YourPassword",
       "type": "mojang"
     },
     "server": {
       "ip": "your-server.com",
       "port": 25565,
       "version": "1.12.1"
     }
   }
   ```

## Usage

### Basic Usage
```bash
node index.js
```

### 24/7 Operation with PM2
```bash
# Start the bot with PM2
pm2 start ecosystem.config.js

# Monitor the bot
pm2 monit

# View logs
pm2 logs minecraft-afk-bot

# Stop the bot
pm2 stop minecraft-afk-bot

# Restart the bot
pm2 restart minecraft-afk-bot
```

### Web Monitoring
Once the bot is running, access the monitoring dashboard at:
```
http://localhost:8000
```

The dashboard provides:
- Real-time bot status (online/offline)
- Current activity and actions
- Game statistics (health, food, position)
- Connection information
- Activity log

## Configuration

### settings.json Options

```json
{
  "bot-account": {
    "username": "BotUsername",
    "password": "BotPassword", 
    "type": "mojang"
  },
  "server": {
    "ip": "server-ip.com",
    "port": 25565,
    "version": "1.12.1"
  },
  "utils": {
    "auto-auth": {
      "enabled": false,
      "password": "server-password"
    },
    "anti-afk": {
      "enabled": true,
      "sneak": true,
      "action-interval": 5000
    },
    "chat-messages": {
      "enabled": false,
      "repeat": true,
      "repeat-delay": 60,
      "messages": ["Hello!", "I'm active"]
    },
    "chat-log": true,
    "auto-reconnect": true,
    "auto-recconect-delay": 5000
  }
}
```

### Key Configuration Options

- **action-interval**: Time between AI actions (milliseconds)
- **auto-reconnect**: Enable automatic reconnection
- **auto-recconect-delay**: Delay before reconnection attempt
- **anti-afk.enabled**: Enable AI movement and actions
- **chat-messages**: Optional chat message system

## Features in Detail

### AI Movement System
The bot uses advanced pathfinding and random movement patterns:
- Moves to random positions within a 10-block radius
- Performs random actions every 5 seconds (configurable)
- Actions include: jumping, sneaking, sprinting, attacking, block placement
- Uses mineflayer-pathfinder for intelligent navigation

### Anti-Detection
- **Variable Timing**: Actions occur at random intervals
- **Diverse Actions**: Multiple types of actions to avoid patterns
- **Smart Movement**: Uses pathfinding instead of simple movement
- **Human-like Behavior**: Mimics natural player behavior

### Monitoring System
- **Web Dashboard**: Beautiful, responsive monitoring interface
- **Real-time Updates**: Status updates every 5 seconds
- **Activity Logging**: Tracks all bot activities
- **Status API**: RESTful API for bot status (`/api/status`)

## Deployment

### Local Deployment
1. Follow installation steps
2. Configure `settings.json`
3. Run with `pm2 start ecosystem.config.js`
4. Access monitoring at `http://localhost:8000`

### Server Deployment
1. Deploy to your server (VPS, cloud instance, etc.)
2. Install Node.js and PM2
3. Clone and configure the bot
4. Start with PM2
5. Configure firewall to allow port 8000 for monitoring

## Troubleshooting

### Common Issues

1. **Bot won't connect**
   - Check server IP and port in `settings.json`
   - Verify Minecraft account credentials
   - Ensure server version matches

2. **Bot gets kicked**
   - Adjust `action-interval` in settings
   - Enable different anti-AFK actions
   - Check server's anti-AFK rules

3. **Web interface not accessible**
   - Ensure port 8000 is not blocked
   - Check if bot is running
   - Verify firewall settings

### Logs
- PM2 logs: `pm2 logs minecraft-afk-bot`
- Log files: `./logs/` directory
- Console output for debugging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This bot is for educational purposes. Make sure to comply with your Minecraft server's rules and terms of service. Use responsibly and respect server policies.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review existing GitHub issues
3. Create a new issue with detailed information

## Server Information

**Default Server**: rakibul966222.aternos.me:31444
- Configure your own server in `settings.json`
- Supports most Minecraft versions
- Works with both premium and cracked servers

---

**Happy Mining! ⛏️**

