const dotenv = require(`dotenv`).config();
const pjson = require(`../package.json`);

var config = {
    developerIDs: [`386940319666667521`, `395711245082427393`],
	  prefix: `c.`,
    token: process.env.REAL_BOT, //DISCORD_BOT_TOKEN,
    db: {
        uri: process.env.DATABASE_URI,
        uriParams: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        password: process.env.DATABASE_PASSWORD
    },
    version: pjson.version,
    footer: `© Doc Nation 2020`
}

config.footer += ` | v${config.version}`;
module.exports = config;