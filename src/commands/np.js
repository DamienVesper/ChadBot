const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const Town = require(`../models/town.model`);

module.exports = {
    name: `np`,
    description: `Replys with the song that is currently playing`,
    usage: null,
    aliases: [`nowplaying`]
}

module.exports.run = async(client, message, args) => {
    const m = `${message.author} »`;
    const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send(`There is nothing playing.`);
		return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
}