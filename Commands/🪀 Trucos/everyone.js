const Discord = require('discord.js');

module.exports = {
    name: 'everyone',
    alias: [],
    desc: "Avisa al miembro que esta molestando mucho con @everyone",
    usage: "everyone <@miembro>",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const user =  message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` Debes mencionar un miembro!')
                .setColor('RED')
                .setTimestamp()
            ]
        })
        message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('😡 \`|\` Deja el ping')
                .setDescription(`🤬 \`|\` Ya deja el ping que no es gracioso, <@${user.id}>!`)
                .setImage(`https://media.discordapp.net/attachments/736272698870857738/736272744731115580/everyone.gif`)
                .setColor('RANDOM')
                .setTimestamp()
            ]
        })

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