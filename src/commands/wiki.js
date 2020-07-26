const { prefix, color } = require('../config.js');
const { MessageEmbed } = require('discord.js');
const Wiki = require('wikijs').default;

const getMatch = str => {
  return str.match(/\(;.*\)/);
};

const showPage = async (message, pageTitle) => {
  const page = await Wiki().page(pageTitle);
  const pageImage = await page.mainImage();
  const summary = `${(await page.summary()).slice(0, 500)}...`;
  const finalSummary = summary.replace(getMatch((await page.summary()).slice(0, 500)), '');
  const embed = new MessageEmbed()
    .setColor(color)
    .setTitle(pageTitle)
    .setThumbnail(pageImage)
    .setURL(page.url())
    .addField('Information', finalSummary, true)
    .setFooter('wikipedia.org', 'https://en.wikipedia.org/static/images/project-logos/enwiki.png');

  return embed;
};

module.exports = {
  name: 'wiki',
  description: "Displays search result from Wikipedia, or a random page if query wasn't given",
  args: false,
  usage: `${prefix}wiki [query]`,
  cooldown: 10,
  guildOnly: false,
  async execute(message, args) {
    let query = '';
    if (args != '') {
      query = args.map(word => word).join(' ');
    }
    try {
      let data;
      let embed;
      if (query == '') {
        data = await Wiki().random(1);
        embed = await showPage(message, data);
      } else {
        data = await Wiki().search(query, 1);
        embed = await showPage(message, data.results[0]);
      }
      message.channel.send(embed);
    } catch(err){
      message.reply(`no results for ${query}`)
    }
  },
};
