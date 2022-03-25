const Discord = require('discord.js');
const figlet = require("figlet");

module.exports = {
    name: 'ascii',
    alias: [],
    desc: "Pone tu texto en ascii",
    usage: "ascii <%texto>",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        let p = args.join(" ")
        if(p.length > 25) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription('❌ `|` Pon un texto menor a 25 caracteres!')
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            return;
        }
        figlet(p, function(err, data) {
            if (err) {
                message.reply('😖 | Hubo un error...');
                console.log(err);
                return;
            } else {
                message.reply(`\`\`\`${data}\`\`\``)
            }
        });

    }

}

/**
 *    ____       _        _   _                 _ 
 *   / ___| __ _| |_ ___ | | | |___ _   _  __ _| |
 *  | |  _ / _` | __/ _ \| | | / __| | | |/ _` | |
 *  | |_| | (_| | || (_) | |_| \__ \ |_| | (_| | |
 *   \____|\__,_|\__\___/ \___/|___/\__,_|\__,_|_|
 *                                                
*/