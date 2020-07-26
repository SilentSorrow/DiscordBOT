require('dotenv').config();
const commandHandler = require('./handlers/command.js');
const fs = require('fs');
const Discord = require('discord.js');
const path = require('path');

const bot = new Discord.Client();

bot.cooldowns = new Discord.Collection();
bot.commands = new Discord.Collection();
const cmdFiles = fs.readdirSync(path.resolve(__dirname, './commands')).filter(f => f.endsWith('.js'));
for (const file of cmdFiles) {
  const command = require('./commands/' + file);
  bot.commands.set(command.name, command);
}

bot.on('ready', () => {
  console.log('Ready!');

  bot.user.setActivity('your mom', { type: 'WATCHING' });
});

bot.on('guildMemberAdd', member => {
  if (!member.user.createdAt) member.send('ALLO ZULUL');
});

bot.on('message', message => {
  console.log(`${message.author.username}: ${message.content}`);
  commandHandler.handle(message);
});

bot.login(process.env.TOKEN);
