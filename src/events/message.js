const Town = require(`../models/town.model`);

const Discord = require(`discord.js`)
const { config, client } = require(`../index.js`);

client.on(`message`, async message => {
    const m = `${message.author} » `;

    /* Botception & Message Handling */
    if(message.author.bot || message.channel.type == `dm`) return;
    if(message.content.slice(0, config.prefix.length).toString().toLowerCase() != config.prefix) return;

    /* Get Commands & Arguments */
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    /* Validate Commands */
    let cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if(!cmd || command === ``) return;
    else if((cmd.usage) && args.length < (cmd.usage.split(`<`).length) - 1) return message.channel.send(`${m} Proper usage is \`${config.prefix + cmd.name} ${cmd.usage}\`.`);
    else {    
        try {
          if(message.author.id == `479108585570172930`) return message.channel.send(`pi.ProcessError returned undefined`);
            console.log('\x1b[35m',`${message.author.tag} ran command ${command} in ${message.guild.name} [${message.guild.id}].`);
            cmd.run(client, message, args);
        }
        catch(err) { console.log('\x1b[31m',`There was an error executing command ${command} by ${message.author.tag}.`); }
    }
});