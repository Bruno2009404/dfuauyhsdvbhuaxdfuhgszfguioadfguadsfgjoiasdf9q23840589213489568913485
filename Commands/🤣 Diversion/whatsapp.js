const Discord = require('discord.js');
const { createCanvas, loadImage } = require('canvas')

module.exports = {
    name: 'whatsapp',
    alias: [],
    desc: "",
    usage: "",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const papu = message.mentions.members.first() || message.guild.members.cache.find((a) => a.user.tag.toLowerCase().includes(args[0]?.toLocaleLowerCase() ?? '') || a.user.username.toLowerCase().includes(args[0]?.toLocaleLowerCase() ?? '') || a.displayName.toLowerCase().includes(args[0]?.toLowerCase() ?? '') ) || message.guild.members.cache.get(args[0]?.toLowerCase() ?? '');
            if (!args[0]) {
                const avatar = await loadImage(message.author.displayAvatarURL({
                    size: 1024, dynamic: true, format: 'png'
                }));
                const canvas = createCanvas(800, 800);
                const ctx = canvas.getContext('2d');
                const background = await loadImage(
                    `https://cdn.discordapp.com/attachments/821168411978629120/830951165943480359/whatsapp.png`
                )

                ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${message.author.username}_whatsapp.png`);

                message.reply({
                    files: [attachment]
                })
            } else {
                const avatar = await loadImage(papu.displayAvatarURL({
                    size: 1024, dynamic: true, format: 'png'
                }));
                const canvas = createCanvas(800, 800);
                const ctx = canvas.getContext('2d');
                const background = await loadImage(
                    `https://cdn.discordapp.com/attachments/821168411978629120/830951165943480359/whatsapp.png`
                )

                ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${papu.username}_whatsapp.png`);

                message.reply({
                    files: [attachment]
                })
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