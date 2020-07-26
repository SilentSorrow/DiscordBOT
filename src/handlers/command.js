const { prefix } = require('../config.js');

function parse(message) {
  const regex = new RegExp(`^${prefix}([a-z0-9]+)(.*)`);
  const match = message.content.match(regex);
  const { commands } = message.client;
  let command = null;
  let args = '';
  if (match) {
    command = commands.get(match[1]);
    args = match[2].trim().split(/ +/);
  }

  return { command, args };
}

const cooldowns = new Set();

module.exports = {
  handle(message) {
    if (message.author.bot || !message.content.startsWith(prefix)) return;
    const { command, args } = parse(message);
    if (!command) return message.reply(`there is no such commmand. Try \`${prefix}help\` command`);
    if (cooldowns.has(message.author.id)) return message.delete();
    cooldowns.add(message.author.id);
    if (command.guildOnly && message.channel.type !== 'text')
      return message.reply('This command is only available in text channels!');
    if (command.args && !args)
      return message.reply(`you have to provide arguments.\nUsage: ${command.usage}`);
    try {
      command.execute(message, args);
    } catch (err) {
      console.log(err);
      message.reply('some error accured...');
    }
    setTimeout(() => cooldowns.delete(message.author.id), command.cooldown * 1000);
  },
};
