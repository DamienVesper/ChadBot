/* Network-Installed Dependencies */
const Discord = require(`discord.js`);
const Math = require(`math.js`);
const fs = require(`fs`);
const dotenv = require(`dotenv`).config();
const ytdl = require(`ytdl-core`);

/* Client Config */
const config = require(`./config`);
const client = new Discord.Client({
    disableEveryone: true,
    fetchAllMembers: true, 
    sync: true
});

const mongoDB = require(`mongodb`);
const mongoose = require(`mongoose`);

//Connect to the Database
mongoDB.connect(config.db.uri, config.db.uriParams).then(() => console.log(`\x1b[32m`,`Succesfully connected to MongoDB Atlas.`)).catch(err => console.error(err));
mongoose.connect(config.db.uri, config.db.uriParams).then(() => console.log(`\x1b[32m`,`Succesfully connected Mongoose to MongoDB.`)).catch(err => console.error(err));

module.exports = {
    config: config,
    client: client
}
const Town = require(`./models/town.model`);

/* Load Events */
client.events = new Discord.Collection();
fs.readdir(`${__dirname}/events/`, (err, files) => {
    if(err) console.error(err);

    let jsFiles = files.filter(f => f.split(`.`).pop() == `js`);
    if(jsFiles.length <= 0) return console.log(`\x1b[33m`,`No events to load!`);

    jsFiles.forEach(f => client.events.set(f.split(`.`)[0], require(`./events/${f}`)));
    console.log(`\x1b[32m`,`Loaded ${jsFiles.length} event${jsFiles.length === 1 ? null: `s`}!`);
});

/* Load Commands */
client.commands = new Discord.Collection();
fs.readdir(`${__dirname}/commands/`, (err, files) => {
    if(err) console.error(err);

    let jsFiles = files.filter(f => f.split(`.`).pop() == `js`);
    if(jsFiles.length <= 0) return console.log(`\x1b[33m`,`No commands to load!`);

    jsFiles.forEach(f => {
        let props = require(`./commands/${f}`);
        client.commands.set(props.name, props);
    });

    console.log(`\x1b[32m`,`Loaded ${jsFiles.length} command${jsFiles.length === 1 ? ``: `s`}!`);
});

client.queue = new Map();

client.login(config.token).catch(err => console.error(`Failed to authenticate client with application.`));
client.setMaxListeners(0);

process.on(`SIGINT`, () => {
    client.user.setPresence({status: `offline`});
    console.log(`\n`);
    console.log(`\x1b[31m`, `Stopped. Bot Offline.`);
    console.log(`\x1b[37m`);
    process.exit();
});