const Discord = require('discord.js');

module.exports = {
    name: 'servericon',
    alias: [],
    desc: "Muestra el icono del servidor",
    usage: "servericon",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const server = message.guild;
        
        const embed = new Discord.MessageEmbed()
        .setTitle(`🖼 \`|\` Icono de ${server.name}`)
        .setDescription(`[\`Descarga aquí\`](${server.iconURL({ size: 1024, dynamic: true, format: 'png' })})`)
        .setImage(server.iconURL({ size: 1024, dynamic: true }))
        .setColor('RANDOM')
        .setFooter({ text: `Icono pedido por: ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
        .setTimestamp()
        message.reply({ embeds: [embed], allowedMentions: { reliedUser: false } })

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