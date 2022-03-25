const Discord = require('discord.js');
const spanishmemes = require('spanish.memes');

module.exports = {
    name: 'meme',
    alias: [],
    desc: "Genera un meme aleatorio",
    usage: "meme",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 1,
    owner: false,

    async execute(client, message, args, prefix){

        let memes = ["video", "normal"];
        let random = memes[Math.floor(Math.random() * memes.length)];
        if(random === 'normal') {
            const attachment = new Discord.MessageAttachment(spanishmemes.Meme(), `meme.png`)
            message.reply({ content: `🎪 | Meme \`Imagen\``, files: [attachment]})
        } else {
            message.reply({ content: `🎪 | Meme \`Video\`\n${spanishmemes.VideoMeme()}` })
        }

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