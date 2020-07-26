const { prefix } = require('../config.js');

module.exports = {
  name: 'help',
  description: 'List all of my commands or info about a specific command',
  args: false,
  usage: `${prefix}help [command]`,
  cooldown: 5,
  guildOnly: false,
  execute(message, args) {
    const { commands } = message.client;
    const response = [];

    if (!commands.has(args[0])) {
      response.push('Here is a list of all commands:');
      response.push(commands.map(cmd => cmd.name).join(', '));
      response.push(
        `\nYou can send \`${prefix}help <command>\` to get info on a specific command!`
      );

      message.channel.send(response);
    } else {
      const command = commands.get(args[0]);
      response.push(`**Command name**: ${command.name}`);
      response.push(`**Description**: ${command.description}`);
      response.push(`**Usage**: ${command.usage}`);
      response.push(`**Cooldown**: ${command.cooldown} second(s)`);

      message.channel.send(response);
    }
  },
};
