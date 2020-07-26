const { prefix } = require('../config.js');
const helper = require('../helper.js');

module.exports = {
  name: 'kick',
  description: 'Kick member',
  args: true,
  usage: `${prefix}kick <user>`,
  cooldown: 5,
  guildOnly: true,
  execute(message, args) {
    const errors = [];
    const userId = helper.getUserIdFromMention(args.shift());
    const member = message.guild.members.cache.get(userId);
    if (!message.member.hasPermission('KICK_MEMBERS'))
      errors.push("you don't have a permission to kick members! :x:");
    if (!message.guild.me.hasPermission('KICK_MEMBERS'))
      errors.push("I don't have a permission to kick members! :x:");
    if (!member) errors.push(`first argument should be a member mention. Usage: ${this.usage}`);
    if (member && !member.kickable) errors.push(`I can't kick ${member.displayName}!`);

    if (errors.length) {
      message.reply(errors.shift());
    } else {
      member.kick();
      message.reply(`${member.displayName} has been kicked :white_check_mark:`);
    }
  },
};
