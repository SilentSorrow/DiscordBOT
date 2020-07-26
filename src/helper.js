module.exports = {
  getUserIdFromMention(str) {
    const matches = str.match(/^<@!?(\d+)>$/);

    if (!matches) return;

    const id = matches[1];
    return id;
  },
  getRoleIdFromMention(str) {
    const matches = str.match(/^<@&(\d+)>$/);

    if (!matches) return;

    const id = matches[1];
    return id;
  },
  getChannelIdFromMention(str) {
    const matches = str.match(/^<#(\d+)>$/);

    if (!matches) return;

    const id = matches[1];
    return id;
  },
};
