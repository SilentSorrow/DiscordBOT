const { prefix } = require('../config.js');
const helper = require('../helper.js');

module.exports = {
  name: 'role',
  description: 'Add/remove a member to a role',
  args: true,
  usage: `${prefix}role <user> <role name>`,
  cooldown: 5,
  guildOnly: true,
  async execute(message, args) {
    const errors = [];
    const userId = helper.getUserIdFromMention(args.shift());
    const roleName = args.shift();
    const member = message.guild.members.cache.get(userId);
    const role = message.guild.roles.cache.find(role => role.name == roleName);
    if (!message.member.hasPermission('MANAGE_ROLES'))
      errors.push("you don't have a permission to manage roles! :x:");
    if (!message.guild.me.hasPermission('MANAGE_ROLES'))
      errors.push("I don't have a permission to manage roles! :x:");
    if (!member) errors.push(`first argument should be a member mention. Usage: ${this.usage}`);
    if (!role) errors.push(`second argument should be a role name. Usage: ${this.usage}`);

    if (errors.length) {
      message.reply(errors.shift());
    } else {
      try {
        if (member.roles.cache.has(role.id)) {
          member.roles.remove(role);
          message.reply(`${member.displayName} doesn't have \`${role.name}\` role anymore`);
        } else {
          await member.roles.add(role);
          message.reply(`${member.displayName} now has \`${role.name}\` role`);
        }
      } catch (err) {
        message.reply("hierarchy doesn't allow me to add/remove that role");
      }
    }
  },
};
