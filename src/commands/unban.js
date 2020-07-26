const { prefix } = require('../config.js');

module.exports = {
  name: 'unban',
  description: 'Unban user',
  args: true,
  usage: `${prefix}unban <user id>`,
  cooldown: 5,
  guildOnly: true,
  async execute(message, args) {
    const errors = [];
    const userId = args[0];
    const banList = await message.guild.fetchBans();
    const bannedUser = banList.find(user => {
      return user.user.id == userId;
    });

    if (!message.member.hasPermission('BAN_MEMBERS'))
      errors.push("you don't have a permission to unban members! :x:");
    if (!message.guild.me.hasPermission('BAN_MEMBERS'))
      errors.push("I don't have a permission to unban members! :x:");
    if (!bannedUser)
      errors.push(
        `there is something wrong with an ID or user is not banned. Example of an ID: ${message.guild.me.id}. Usage: ${this.usage}`
      );

    if (errors.length) {
      message.reply(errors.shift());
    } else {
      message.guild.members.unban(bannedUser.user.id);
      message.reply(`${bannedUser.user.username} has been unbanned :white_check_mark:`);
    }
  },
};
