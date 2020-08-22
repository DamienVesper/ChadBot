const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const Town = require(`../models/town.model`);

module.exports = {
    name: `simp`,
    description: `Is that you, Kyle?`,
    usage: null,
    aliases: [`pokimane`]
}

module.exports.run = async(client, message, args) => {
    const m = `${message.author} »`;

    message.channel.send({ files: [`./src/images/horny.jpg`] })
    
}