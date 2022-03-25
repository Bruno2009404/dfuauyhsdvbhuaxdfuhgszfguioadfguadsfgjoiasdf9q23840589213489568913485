const Discord = require('discord.js');
const fietu = require('fietu');

module.exports = {
    name: 'tweet',
    alias: ["twitter"],
    desc: "Hace una imagen con ti nombre y perfil como si estuvieras en twitter",
    usage: "tweet [%text]",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const text = args.join(" ");
            if(!text) {
                return message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle('❌ `|` Error')
                        .setDescription('❌ `|` Debes decir un texto! (menor a 45 caracteres)')
                        .setColor('RED')
                        .setTimestamp()
                    ]
                })
            } else {
                if(text.length > 45) {
                    return message.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setTitle('❌ `|` Error')
                            .setDescription('❌ `|` El texto debe ser menor a 45 caracteres!')
                            .setColor('RED')
                            .setTimestamp()
                        ]
                    })
                } else {
                    const tweet2 = await new fietu.tweet()
                    .setAvatar(message.author.displayAvatarURL({ format: 'png' }))
                    .setText(text.replaceAll('\n', ' '))
                    .setName(message.author.username)
                    .tweet()
                    const attachment2 = new Discord.MessageAttachment(tweet2, 'tweet.png')
                    return message.reply({ files: [attachment2] })
                }
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