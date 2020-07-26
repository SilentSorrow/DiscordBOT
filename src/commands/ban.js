const { prefix } = require('../config.js');
const helper = require('../helper.js');

module.exports = {
  name: 'ban',
  description: 'Ban member',
  args: true,
  usage: `${prefix}ban <user> [reason]`,
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
      let reason = 'No reason given';
      if (args != '') {
        reason = args.map(word => word).join(' ');
      }
      member.ban({ reason: reason });
      message.reply(`${member.displayName} has been banned :white_check_mark:. Reason: ${reason}`);
    }
  },
};
