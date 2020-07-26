const { prefix } = require('../config.js');
const ytdl = require('ytdl-core');

module.exports = {
  name: 'song',
  description: 'Plays or stops youtube audio in voice channel',
  args: true,
  usage: `${prefix}song stop/</YT link>`,
  cooldown: 5,
  guildOnly: true,
  async execute(message, args) {
    const errors = [];
    const voiceChannel = message.member.voice.channel;
    const link = args[0];
    if (!message.member.hasPermission('MANAGE_CHANNELS'))
      errors.push("you don't have a permission to execute this command! :x:");
    if (!voiceChannel) errors.push('join voice channel first');
    if (link == 'stop') return voiceChannel.leave();
    if (errors.length) {
      message.reply(errors.shift());
    } else {
      try {
        const connection = await voiceChannel.join();
        const stream = ytdl(link, { filter: 'audioonly' });
        const player = connection.play(stream);

        player.on('finish', () => voiceChannel.leave());
      } catch (err) {
        voiceChannel.leave();
        message.reply(`something wrong with the link you provided`);
      }
    }
  },
};
