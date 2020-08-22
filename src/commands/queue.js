const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const Town = require(`../models/town.model`);

module.exports = {
    name: `queue`,
    description: `View the song queue.`,
    usage: null,
    aliases: [`q`]
}

module.exports.run = async(client, message, args) => {
    const m = `${message.author} »`;

    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send(`There is nothing playing.`);

    let sEmbed = new Discord.RichEmbed()
        .setAuthor(`Song Queue`)
        .setColor(0x1e90ff)
        .setDescription(`
        **Now Playing**: ${serverQueue.songs[0].title}
        ${serverQueue.songs.map((song, i) => i == 0 ? null: `\`${i}\`. ${song.title}`).join(`\n`)}
        `)
        .setTimestamp(new Date());
    return message.channel.send(sEmbed);

}