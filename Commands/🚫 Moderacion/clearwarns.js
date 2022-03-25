const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const warnSchema = require("../../Schemas/warns");
const qdb = require('quick.db');

module.exports = {
    name: 'clearwarns',
    alias: [],
    desc: "Limpia todos los warns del miembro",
    usage: "clearwarns <@miembro>",
    userPerms: ["ADMINISTRATOR"],
    botPerms: ["MANAGE_SERVERS"],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        let usuario =  message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!usuario) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` Debes mencionar un miembro!')
                .setColor('RED')
                .setTimestamp()
            ]
        })
        let data = await warnSchema.findOne({ guildId: message.guild.id, userId: usuario.user.id });
        if (data.warnings.length === 0) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` El miembro que has especificado no tiene ningún warning!')
                .setColor('RED')
                .setTimestamp()
            ]
        })
        if (usuario.id == message.guild.ownerId) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` No puedes remover el aviso al DUEÑO del Servidor!')
                .setColor('RED')
                .setTimestamp()
            ]
        })
        if (message.guild.me.roles.highest.position > usuario.roles.highest.position) {
            if (message.member.roles.highest.position > usuario.roles.highest.position) {
                await warnSchema.findOneAndDelete({ guildId: message.guild.id, userId: usuario.user.id }, {
                    warnings: [{
                        moderator: message.author.id,
                        time: Date.now()
                    }]
                })
                data.save();
                message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle(`📜 \`|\` Warneos removidos`)
                        .setDescription(`👤 \`|\` Se ha removido todos los warneos de \`${usuario.user.tag}\` exitosamente!`)
                        .setColor('GOLD')
                        .setTimestamp()
                    ]
                })
            } else {
                return message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle('❌ `|` Error')
                        .setDescription('❌ `|` Tu Rol está por __debajo__ del miembro que quieres para remover el aviso!')
                        .setColor('RED')
                        .setTimestamp()
                    ]
                })
            }
        } else {
            return message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription('❌ `|` Mi Rol está por __debajo__ del miembro que quieres para remover el aviso!')
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
        }

        let channel = qdb.fetch(`modlog_${message.guild.id}`)
        if (channel == null) return;
        if (!channel) return;
        const embed = new MessageEmbed()
        .setAuthor({ name: `${message.guild.name} Modlogs`, iconURL: `${message.guild.iconURL()}` })
        .setColor("RANDOM")
        .setThumbnail(usuario.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `${message.guild.name}`, iconURL: `${message.guild.iconURL()}` })
        .addField("🛠 Moderación", "\`\`\`clearwarns\`\`\`")
        .addField("👨‍🔧 General", `🎇 \`|\` Nombre: **${usuario.user.username}**\n🆔 \`|\` ID: **${usuario.user.id}**\n🔨 \`|\` Warneos eliminados por: **${message.author.username}**\n📅 \`|\` Dia: **${message.createdAt.toLocaleString()}**`)
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