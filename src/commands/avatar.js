const { prefix } = require('../config.js');
const helper = require('../helper.js');

module.exports = {
  name: 'avatar',
  description: 'Displas avatar of mentioned user',
  args: true,
  usage: `${prefix}avatar <user>`,
  cooldown: 10,
  guildOnly: false,
  execute(message, args) {
    const errors = [];
    const userId = helper.getUserIdFromMention(args.shift());
    const member = message.guild.members.cache.get(userId);
    if (!member) errors.push(`first argument should be a member mention. Usage: ${this.usage}`)

    if (errors.length) {
      message.reply(errors.shift());
    } else {
      message.channel.send(member.user.displayAvatarURL());
    }
  },
};
