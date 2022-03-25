const Discord = require('discord.js');

module.exports = {
    name: 'avatar',
    alias: [],
    desc: "Muestra el avatar de un miembro",
    usage: "avatar [@miembro]",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        let user = message.mentions.users.first() || message.author;
        let avatar = user.displayAvatarURL({
            size: 1024, dynamic: true, format: 'png'
        })
        let desc;
        if(avatar.includes('embed')) {
            desc = `😉 \`|\` El usuario tiene un avatar predeterminado de Discord!\n🔽 \`|\` [\`Descarga aquí\`](${avatar})`
        } else {
            desc = `🔽 \`|\` [\`Descarga aquí\`](${avatar})`
        }
        const embed = new Discord.MessageEmbed()
        .setTitle(`🖼 \`|\` Avatar de ${user.tag}`)
        .setDescription(desc)
        .setImage(avatar)
        .setColor('RANDOM')
        .setFooter({ text: `Avatar pedido por: ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
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