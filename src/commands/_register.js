// const Discord = require(`discord.js`);
// const { config } = require(`../index.js`);
// const Town = require(`../models/town.model`);

module.exports = {
    name: ``,
    description: ``,
    usage: null,
    aliases: null
}

// module.exports.run = async(client, message, args) => {
//     const m = `${message.author} »`;
    
//     message.channel.send(`What is your in Game Name?`).then(a => {
//         message.channel.awaitMessages(b => b.author == message.author, {
//             max: 1,
//             time: 3e4,
//             errors: [`time`]
//         }).then(c => {
//             message.channel.send(`What town are you in?`).then(() => {
//                 message.channel.awaitMessages(d => d.author == message.author, {
//                     max: 1,
//                     time: 3e4,
//                     errors: [`time`]
//                 }).then(e => {

//                     let playerTown = Town.findOne({ name: '_insert_name_here' });
                    
//                     //invalid town
//                     if(!playerTown) {}

                            

//                     /* stupid code
//                     message.delete();
//                     a.delete();
//                     b.delete();
//                     c.delete();
//                     e.delete();
//                     f.delete();
//                     g.delete();
//                     */
//                 });
//             });
//         });
//     });
// }