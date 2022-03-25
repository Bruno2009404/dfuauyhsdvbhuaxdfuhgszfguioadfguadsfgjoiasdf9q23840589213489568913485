const Discord = require('discord.js');

module.exports = {
    name: 'setname',
    alias: ["cn", "sn", "changename"],
    userPerms: ["MANAGE_SERVERS"],
    botPerms: ["MANAGE_MESSAGES"],
    cooldown: null,
    owner: true,

    async execute(client, message, args, prefix){

        if(!args.length) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` Tienes que especificar el nombre del bot!')
                .setColor('RED')
                .setTimestamp()
            ]
        })
        if(args.length > 32) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` El nombre del bot no puede superar los 32 caracteres!')
                .setColor('RED')
                .setTimestamp()
            ]
        })
        try {
            client.user.setUsername(args.join(" "))
            return message.reply(`✅ | Cambiado el nombre del bot a \`${args.join(" ")}\``)
        } catch (e){
            message.channel.send({
                embeds: [new Discord.MessageEmbed()
                .setTitle(`ERROR`)
                .setDescription(`\`\`\`js\n${e.toString().substring(0, 2048)}\`\`\``)
                .setColor("FF0000")
                .setTimestamp()
            ]
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