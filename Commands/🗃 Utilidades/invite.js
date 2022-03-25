const Discord = require('discord.js');

module.exports = {
    name: 'invite',
    alias: ["invitacion", "invite-bot", "invitebot"],
    desc: "Invita al bot a un servidor",
    usage: "invite",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('📩 \`|\` Invitación')
                .setDescription(`📩 \`|\` Esta es la invitación de **${client.user.username}**\n\n[\`Invitación\`](https://discord.com/api/oauth2/authorize?client_id=940326787626463272&permissions=8&scope=bot%20applications.commands)`)
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