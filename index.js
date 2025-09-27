const mineflayer = require("mineflayer");
const { Vec3 } = require("vec3");
const { pathfinder, Movements, goals: { GoalBlock, GoalNear, GoalFollow } } = require('mineflayer-pathfinder');
const { mineflayer: mineflayerViewer } = require('prismarine-viewer');
const collectBlock = require('mineflayer-collectblock').plugin;
const inventoryViewer = require('mineflayer-web-inventory');

const config = require('./settings.json');
const express = require('express');
const path = require('path');

const app = express();
let botStatus = {
  online: false,
  lastActivity: null,
  position: null,
  health: null,
  food: null,
  connectedTime: null,
  reconnectCount: 0,
  currentAction: 'Idle'
};

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/status', (req, res) => {
  res.json(botStatus);
});

app.listen(8000, '0.0.0.0', () => {
  console.log('Monitoring server started on port 8000');
});

function createBot() {
   const bot = mineflayer.createBot({
      username: config['bot-account']['username'],
      password: config['bot-account']['password'],
      auth: config['bot-account']['type'],
      host: config.server.ip,
      port: config.server.port,
      version: config.server.version,
   });

   bot.loadPlugin(pathfinder);
   bot.loadPlugin(collectBlock);
   inventoryViewer(bot);
   const mcData = require("minecraft-data")(bot.version);
   const defaultMove = new Movements(bot, mcData);
   bot.settings.colorsEnabled = false;

   bot.once('spawn', () => {
      console.log('\x1b[33m[AfkBot] Bot joined to the server', '\x1b[0m');
      
      // Update bot status
      botStatus.online = true;
      botStatus.connectedTime = new Date();
      botStatus.position = bot.entity.position;
      botStatus.health = bot.health;
      botStatus.food = bot.food;
      botStatus.lastActivity = new Date();

      if (config.utils['auto-auth'].enabled) {
         console.log('[INFO] Started auto-auth module');

         var password = config.utils['auto-auth'].password;
         setTimeout(() => {
            bot.chat(`/register ${password} ${password}`);
            bot.chat(`/login ${password}`);
         }, 500);

         console.log(`[Auth] Authentification commands executed.`);
      }

      if (config.utils['chat-messages'].enabled) {
         console.log('[INFO] Started chat-messages module');
         var messages = config.utils['chat-messages']['messages'];

         if (config.utils['chat-messages'].repeat) {
            var delay = config.utils['chat-messages']['repeat-delay'];
            let i = 0;

            let msg_timer = setInterval(() => {
               bot.chat(`${messages[i]}`);

               if (i + 1 == messages.length) {
                  i = 0;
               } else i++;
            }, delay * 1000);
         } else {
            messages.forEach((msg) => {
               bot.chat(msg);
            });
         }
      }

      // AI Movement and Anti-AFK
      if (config.utils["anti-afk"].enabled) {
         console.log("[INFO] Started advanced anti-afk module");
         setInterval(() => {
            // Random movement
            const randomX = Math.floor(Math.random() * 10) - 5;
            const randomZ = Math.floor(Math.random() * 10) - 5;
            const targetPos = bot.entity.position.offset(randomX, 0, randomZ);
            bot.pathfinder.setMovements(defaultMove);
            bot.pathfinder.setGoal(new GoalBlock(targetPos.x, targetPos.y, targetPos.z));

            // Random actions
            const actions = ['jump', 'sneak', 'sprint', 'attack', 'placeBlock'];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            
            // Update status
            botStatus.currentAction = `Performing: ${randomAction}`;
            botStatus.lastActivity = new Date();
            botStatus.position = bot.entity.position;
            botStatus.health = bot.health;
            botStatus.food = bot.food;

            switch (randomAction) {
               case 'jump':
                  bot.setControlState('jump', true);
                  setTimeout(() => bot.setControlState('jump', false), 100);
                  break;
               case 'sneak':
                  bot.setControlState('sneak', true);
                  setTimeout(() => bot.setControlState('sneak', false), 1000);
                  break;
               case 'sprint':
                  bot.setControlState('sprint', true);
                  setTimeout(() => bot.setControlState('sprint', false), 1000);
                  break;
               case 'attack':
                  const entity = bot.nearestEntity();
                  if (entity) {
                     bot.attack(entity);
                  }
                  break;
               case 'placeBlock':
                  // Simple block placement for anti-afk, needs more sophisticated logic for actual building
                  const referenceBlock = bot.blockAt(bot.entity.position.offset(0, -1, 0));
                  if (referenceBlock && bot.inventory.items().length > 0) {
                     const blockToPlace = bot.inventory.items().find(item => item.name.includes('dirt') || item.name.includes('cobblestone'));
                     if (blockToPlace) {
                        try {
                           bot.equip(blockToPlace, 'hand');
                           bot.placeBlock(referenceBlock, new Vec3(0, 1, 0));
                        } catch (e) {
                           console.log(`[Anti-AFK] Could not place block: ${e.message}`);
                        }
                     }
                  }
                  break;
            }
         }, config.utils["anti-afk"]["action-interval"] || 5000); // Perform action every 5 seconds by default
      }


   });

   bot.on('chat', (username, message) => {
      if (config.utils['chat-log']) {
         console.log(`[ChatLog] <${username}> ${message}`);
      }
   });

   bot.on('goal_reached', () => {
      console.log(
         `\x1b[32m[AfkBot] Bot arrived to target location. ${bot.entity.position}\x1b[0m`
      );
   });

   bot.on('death', () => {
      console.log(
         `\x1b[33m[AfkBot] Bot has been died and was respawned ${bot.entity.position}`,
         '\x1b[0m'
      );
   });

   if (config.utils['auto-reconnect']) {
      bot.on('end', () => {
         console.log('[INFO] Bot disconnected, attempting to reconnect...');
         botStatus.online = false;
         botStatus.reconnectCount++;
         botStatus.currentAction = 'Reconnecting...';
         setTimeout(() => {
            createBot();
         }, config.utils['auto-recconect-delay']);
      });
   }

   bot.on('kicked', (reason) => {
      console.log('\x1b[33m', `[AfkBot] Bot was kicked from the server. Reason: \n${reason}`, '\x1b[0m');
      botStatus.online = false;
      botStatus.currentAction = `Kicked: ${reason}`;
   });
   
   bot.on('error', (err) => {
      console.log(`\x1b[31m[ERROR] ${err.message}`, '\x1b[0m');
      botStatus.online = false;
      botStatus.currentAction = `Error: ${err.message}`;
   });

   bot.on('death', () => {
      console.log(`\x1b[33m[AfkBot] Bot has been died and was respawned ${bot.entity.position}`, '\x1b[0m');
      botStatus.currentAction = 'Respawned after death';
      botStatus.lastActivity = new Date();
   });