const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const Town = require(`../models/town.model`);

module.exports = {
    name: `45pints`,
    description: `And I go at it agin.`,
    usage: null,
    aliases: [`paddylosty`]
}

module.exports.run = async(client, message, args) => {
    const m = `${message.author} »`;
    message.channel.send(`And I wouldn't ben fond of drinking, but when I go at it, I do go at it awful and very hard, I do have forty-five pints in about two hours. I'd have a packet of crisps then and maybe an auld packet of peanuts. And I'd go for probably...ah I'd have ten more anyway. And then I'd get up the following mornin, and Maureen would have the fry on. And I'd go at it agin. And there'd be no shtappin me. I'd take the shirt off anay man's back.`, { files: [`./src/images/45pints.PNG`] });
}