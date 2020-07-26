const { prefix } = require('../config.js');
const helper = require('../helper.js');

module.exports = {
  name: 'rolelist',
  description: 'List all server roles or roles of mentioned member',
  args: true,
  usage: `${prefix}role <user> <role>`,
  cooldown: 5,
  guildOnly: true,
  execute(message, args) {
    const response = [];
    const userId = helper.getUserIdFromMention(args.shift());
    const member = message.guild.members.cache.get(userId);
    const allRoles = message.guild.roles.cache
      .filter(role => role.name != '@everyone')
      .sort((role, nextrole) => {
        return nextrole.rawPosition - role.rawPosition;
      });

    if (!member) {
      response.push(`There are total of ${allRoles.size} roles. Here is a list of them:`);
      response.push(allRoles.map(role => `-${role.name}`).join('\n'));
      response.push(`\nYou can send \`${prefix}rolelist <user>\` to get all roles member has!`);

      message.channel.send(response);
    } else {
      const memberRoles = member.roles.cache
        .filter(role => role.name != '@everyone')
        .sort((role, nextrole) => {
          return nextrole.rawPosition - role.rawPosition;
        });
      console.log(memberRoles);
      if (!memberRoles.size) {
        message.reply(`${member.displayName} has no roles`);
      } else {
        response.push(`**Member name**: ${member.displayName}`);
        response.push(`**Role list**: ${memberRoles.map(role => role.name).join(', ')}`);

        message.channel.send(response);
      }
    }
  },
};
