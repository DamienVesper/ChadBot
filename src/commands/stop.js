const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const Town = require(`../models/town.model`);

module.exports = {
    name: `stop`,
    description: `Stop playing songs.`,
    usage: null,
    aliases: null
}

module.exports.run = async(client, message, args) => {
    if(message.author.id == `479108585570172930`) return;

    const m = `${message.author} »`;

    const { voiceChannel } = message.member;

    if (!voiceChannel) return message.channel.send(`I'm sorry but you need to be in a voice channel to play music!`);
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) return message.channel.send(`There is nothing playing that I could stop for you.`);

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end(`Stop command has been used!`);
}