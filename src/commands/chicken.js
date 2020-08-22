const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const Town = require(`../models/town.model`);
const fs = require(`fs`);

module.exports = {
    name: `chicken`,
    description: `wHaT dA hEcK???`,
    usage: null,
    aliases: null
}

module.exports.run = async(client, message, args) => {
    const m = `${message.author} »`;

    fs.readdir(`./src/images/chickens`, (err, files) => {
        let rng = Math.floor(Math.random() * files.length) + 1;
        message.channel.send(`wHaT dA hEcK???`, { files: [`./src/images/chickens/chicken${rng}.png`] });
    });
}