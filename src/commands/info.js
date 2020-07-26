const { prefix, color } = require('../config.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'info',
  description: 'Gives information about the server',
  args: false,
  usage: `${prefix}info`,
  cooldown: 5,
  guildOnly: true,
  execute(message, args) {
    const embed = new MessageEmbed()
      .setColor(color)
      .setTitle('Useless Server Information')
      .setThumbnail(message.guild.iconURL())
      .addFields(
        { name: `**Server Name**`, value: message.guild.name, inline: true },
        { name: `**Server Owner**`, value: message.guild.owner, inline: true },
        { name: `**Server Region**`, value: message.guild.region.toUpperCase(), inline: true },
        { name: `**Member Count**`, value: message.guild.memberCount, inline: true },
        { name: `**Channel Count**`, value: message.guild.channels.cache.size, inline: true },
        { name: `**Role Count**`, value: message.guild.roles.cache.size, inline: true }
      )
      .setTimestamp()
      .setFooter('Command called some retard', message.guild.iconURL());

    message.channel.send(embed);
  },
};
