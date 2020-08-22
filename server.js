const DiscordBot = require(`./src/index.js`);

const express = require(`express`);
const bodyParser = require(`body-parser`);
const fs = require(`fs`);
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(`public`));

//Site
app.get(`/`, (req, res) => res.send(`hello world`));
//res.sendFile(`${__dirname}/views/index.html`));
// app.get(`/about`, (req, res) => res.sendFile(`${__dirname}/views/about.html`));
// // app.get(`/social`, (req, res) => res.sendFile(`${__dirname}/views/social.html`));

// //Twitch
// app.get(`/twitch/stream`, (req, res) => res.sendFile(`${__dirname}/views/twitch/stream.html`));
// app.get(`/twitch/overlay`, (req, res) => res.sendFile(`${__dirname}/views/twitch/overlay.html`));

// //Redirects
// console.log(process.env.DISCORD_SERVER_INVITE);
// app.get(`/discord`, (req, res) => res.send(`<script> window.location.href = "https://discordapp.com/invite/nuFyWpC/"; </script>`));
// app.get(`/uploads`, (req, res) => res.send(`<script> window.location.href = "https://${process.env.FILESITE}.x10host.com/"; </script>`));
// app.get(`/social`, (req, res) => `<script> window.location.href = "https://zeropoint.glitch.me/twitch/stream/"; </script>`);

const appListener = app.listen(process.env.NODE_SERVER_PORT, () => console.log(`Your app is listening on port ${appListener.address().port}.`));