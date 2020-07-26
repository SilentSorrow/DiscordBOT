const { prefix } = require('../config.js');

module.exports = {
  name: 'coin',
  description: 'Toss a coin',
  args: true,
  usage: `${prefix}coin`,
  cooldown: 5,
  guildOnly: false,
  execute(message, args) {
    const coin = Math.random();
    coin > 0.49 ?  message.reply('tails') : message.reply('heads');
  },
};
