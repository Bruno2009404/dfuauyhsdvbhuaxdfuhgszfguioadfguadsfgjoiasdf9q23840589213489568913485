const Discord = require('discord.js');
const qdb = require('quick.db');

module.exports = {
    name: 'changenick',
    alias: [],
    desc: "establece un nuevo apodo a un miembro",
    usage: "changenick <@miembro> <%apodo>",
    userPerms: ["CHANGE_NICKNAME"],
    botPerms: ["CHANGE_NICKNAME"],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){
      
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` No puedo cambiar el nombre a ese usuario!')
                .setColor('RED')
                .setTimestamp()
            ]
        })

        let nick = args.slice(1).join(' ');
        if(!nick) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` Dime que nuevo apodo le quieres dar!')
                .setColor('RED')
                .setTimestamp()
            ]
        })

        try {
            member.setNickname(nick)
            const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setTitle('💎 \`|\` Apodo cambiado')
            .setDescription(`🤗 \`|\` Apodo de ${member.displayName} fue cambiado a **${nick}**`)
            .setTimestamp()
            message.reply({ embeds: [embed], allowedMentions: { reliedUser: false } })
        } catch (e) {
            console.error(e)
        }
        
        let channel = qdb.fetch(`modlog_${message.guild.id}`)
        if (channel == null) return;
        if (!channel) return;
        const embed = new MessageEmbed()
        .setAuthor({ name: `${message.guild.name} Modlogs`, iconURL: `${message.guild.iconURL()}` })
        .setColor("RANDOM")
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `${message.guild.name}`, iconURL: `${message.guild.iconURL()}` })
        .addField("🛠 Moderación", "\`\`\`changenick\`\`\`")
        .addField("👨‍🔧 General", `❔ \`|\` Apodo cambiado de: **${member.user.username}**\n❓ \`|\` Apodo cambiado por: **${message.author.id}**\n⁉ \`|\` Apodo cambiado a: **${nick}**\n📅 \`|\` Dia: **${message.createdAt.toLocaleString()}**`)
        .setTimestamp();
        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send({ embeds: [embed] })

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