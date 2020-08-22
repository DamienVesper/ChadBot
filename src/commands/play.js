const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const { cleanse, searchYoutube } = require(`../functions.js`);
const ytdl = require(`ytdl-core`);
const Town = require(`../models/town.model`);

module.exports = {
    name: `play`,
    description: `Play a song!`,
    usage: `<song>`,
    aliases: [`p`]
}

module.exports.run = async(client, message, args) => {
	const { voiceChannel } = message.member;
		if(!voiceChannel) return message.channel.send(`I'm sorry but you need to be in a voice channel to play music!`);

		const permissions = voiceChannel.permissionsFor(message.client.user);

		if(!permissions.has(`CONNECT`)) return message.channel.send(`I cannot connect to your voice channel, make sure I have the proper permissions!`);
		if(!permissions.has(`SPEAK`)) return message.channel.send(`I cannot speak in this voice channel, make sure I have the proper permissions!`);

		const serverQueue = message.client.queue.get(message.guild.id);
		let songInfo;
		if(args.length == 1 && args[0]) songInfo = await ytdl.getInfo(args[0]);
		else {
			let pingPong = await searchYoutube(args.join(` `));
			songInfo = await ytdl.getInfo(pingPong.videos[0].url);
		}
		
		const song = {
			id: songInfo.videoDetails.id,
			title: cleanse(songInfo.videoDetails.title),
			url: songInfo.videoDetails.video_url,
		}

		if (serverQueue) {
			serverQueue.songs.push(song);

			const queueAddEmbed = new Discord.RichEmbed()
				.setColor(0x0cdf24)
				.setAuthor(`"${song.title}" has been added to the queue!`)
				.setDescription(song.url)
			return message.channel.send(queueAddEmbed);
		}

		const queueConstruct = {
			textChannel: message.channel,
			voiceChannel,
			connection: null,
			songs: [],
			volume: 2,
			playing: true
		}

		message.client.queue.set(message.guild.id, queueConstruct);
		queueConstruct.songs.push(song);

		const play = async song => {
			const queue = message.client.queue.get(message.guild.id);

			if(!song) {
				queue.voiceChannel.leave();
				message.client.queue.delete(message.guild.id);
				return;
			}

			const dispatcher = queue.connection.playStream(ytdl(song.url , { quality: 'lowestaudio' }))
				.on(`end`, reason => {
					if (reason === `Stream is not generating quickly enough.`) console.log(`Song ended due to stream is not generating quickly enough.`);
					else console.log(reason);
					queue.songs.shift();
					play(queue.songs[0]);
				})
				.on(`error`, error => console.error(error));
			dispatcher.setVolumeLogarithmic(queue.volume / 5);

			const playingEmbed = new Discord.RichEmbed()
				.setColor(0x5ce6c8)
				.setAuthor(`Started playing: ${song.title}`)
				.setDescription(song.url)

			queue.textChannel.send(playingEmbed);
		};

		try {
			const connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			message.client.queue.delete(message.guild.id);
			await voiceChannel.leave();
			return message.channel.send(`I could not join the voice channel: ${error}`);
		}
}