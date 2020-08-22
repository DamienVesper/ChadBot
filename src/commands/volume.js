const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const Town = require(`../models/town.model`);

module.exports = {
    name: `volume`,
    description: `Adjust volume.`,
    usage: null,
    aliases: [`v`]
}

module.exports.run = async(client, message, args) => {
    const m = `${message.author} »`;

    const { voiceChannel } = message.member;
    if(!voiceChannel) return message.channel.send(`I'm sorry but you need to be in a voice channel to play music!`);

    const serverQueue = message.client.queue.get(message.guild.id);

    if(!serverQueue) return message.channel.send(`There is nothing playing.`);
    if(!args[0]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
    
    if(!config.developerIDs.includes(message.author.id) && parseInt(args[0]) > 100 || parseInt(args[0]) <= 0) {
        return message.channel.send(`${m} Volume must be between 1 and 100%!`);
    }

    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolume(parseInt(args[0]) / 500);

    return message.channel.send(`🔊 Set the volume to: **${args[0]}%**`);
}