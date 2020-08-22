const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const Town = require(`../models/town.model`);

module.exports = {
    name: `dev`,
    description: `None of your beezwax, Lignus Tech Tzips`,
    usage: null,
    aliases: null
}

module.exports.run = async(client, message, args) => {
    const m = `${message.author} »`;
    if(!config.developerIDs.includes(message.author.id)) return message.channel.send(`${m} You can't use that!`);

    switch(args.shift()) {
        case `reload`:
            if(!args[0]) return message.channel.send(`${m} Proper usage is \`${config.prefix}dev reload <command>\`.`);

            let command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
            delete require.cache[require.resolve(`./${command.name}.js`)];

            let reloadedCommand = require(`./${command.name}.js`);
            if(!reloadedCommand) return;
            client.commands.set(reloadedCommand.name, reloadedCommand);

            message.channel.send(`${m} Command \`${command.name}.js\` was reloaded.`);
            break;
        case `echo`:
            let customMessage = args.slice(0).join(` `);
            await message.delete().catch(O_o => {});

            message.channel.send(customMessage);
            break;
        default: return message.channel.send(`${m} That developer command doesn't exist!`);
    }
}