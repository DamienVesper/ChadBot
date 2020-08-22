const Town = require(`../models/town.model`);

const Discord = require(`discord.js`)
const { config, client } = require(`../index.js`);

client.on(`ready`, async() => {
    console.log('\x1b[32m',`${client.user.username}#${client.user.discriminator} v${config.version} has started, with ${client.users.size} users in ${client.guilds.size} servers.`);

    // let memberCount = client.guilds.get(`658428108185010197`).memberCount; //add this whenever its added to goldenheart discord
	client.user.setPresence({
        game: {
            name: `${client.users.size} users in the Doc Nation takeover`,
            type: `WATCHING`
        },
        status: `dnd`
	});
});