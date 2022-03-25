const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const warnSchema = require("../../Schemas/warns");
const qdb = require('quick.db');

module.exports = {
    name: 'removewarn',
    alias: [],
    desc: "Remueve un warn especifico de un miembro",
    usage: "removewarn <@miembro> <!numero>",
    userPerms: ["ADMINISTRATOR"],
    botPerms: ["MANAGE_SERVERS"],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        let usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!usuario) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` Debes mencionar un miembro!')
                .setColor('RED')
                .setTimestamp()
            ]
        })
        let id_warn = args[1];
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
        if (!id_warn) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` Debes escribir el ID del warn para remover')
                .setColor('RED')
                .setTimestamp()
            ]
        })
        if (isNaN(id_warn) || id_warn < 0) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` La ID del warn que has especificado no es válida!')
                .setColor('RED')
                .setTimestamp()
            ]
        })
        if(data.warnings[id_warn] == undefined) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` No se ha encontrado el warn que has especificado!')
                .setColor('RED')
                .setTimestamp()
            ]
        })
        if (message.guild.me.roles.highest.position > usuario.roles.highest.position) {
            if (message.member.roles.highest.position > usuario.roles.highest.position) {
                data.warnings.splice(id_warn, 1);
                data.save();
                message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle(`📜 \`|\` Warn removido`)
                        .setDescription(`👤 \`|\` Se ha removido el warn con ID \`${id_warn}\` de \`${usuario.user.tag}\` exitosamente!\n\n> **Aviso importante:** __Si el \`${prefix}warnings\` no responde, significa que es un bug, para arreglarlo debe avisar de vuelta ese miembro!__`)
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
        .addField("🛠 Moderación", "\`\`\`removewarn\`\`\`")
        .addField("👨‍🔧 General", `🎇 \`|\` Nombre: **${usuario.user.username}**\n🆔 \`|\` ID: **${usuario.id}**\n🔨 \`|\` Warneo removido por: **${message.author.username}**\n🔢 \`|\` Warneo numero: **${id_warn}**\n📅 \`|\` Dia: **${message.createdAt.toLocaleString()}**`)
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