const { prefix } = require('../config.js');
const helper = require('../helper.js');

module.exports = {
  name: 'softban',
  description: 'Softban member',
  args: true,
  usage: `${prefix}softban <user>`,
  cooldown: 5,
  guildOnly: true,
  execute(message, args) {
    const errors = [];
    const userId = helper.getUserIdFromMention(args.shift());
    const member = message.guild.members.cache.get(userId);
    if (!message.member.hasPermission('BAN_MEMBERS'))
      errors.push("you don't have a permission to ban members! :x:");
    if (!message.guild.me.hasPermission('BAN_MEMBERS'))
      errors.push("I don't have a permission to ban members! :x:");
    if (!member) errors.push(`first argument should be a member mention. Usage: ${this.usage}`);
    if (member && !member.bannable) errors.push(`I can't ban ${member.displayName}!`);

    if (errors.length) {
      message.reply(errors.shift());
    } else {
      member.ban().then(() => message.guild.members.unban(member.id));
      message.reply(`${member.displayName} has been softbanned :white_check_mark:`);
    }
  },
};
