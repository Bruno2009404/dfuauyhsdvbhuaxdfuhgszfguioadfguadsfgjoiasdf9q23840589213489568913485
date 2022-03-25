const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const warnSchema = require("../../Schemas/warns");
const qdb = require('quick.db');

module.exports = {
    name: 'warn',
    alias: [],
    desc: "Warnea a un miembro",
    usage: "warn <@miembro> [%razon]",
    userPerms: ["ADMINISTRATOR"],
    botPerms: ["MANAGE_SERVERS"],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const usuario = message.mentions.members.first()
        if (!usuario) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` Debes mencionar un miembro!')
                .setColor('RED')
                .setTimestamp()
            ]
        })

        const reason = args.slice(1).join(" ") || "No se ha especificado ninguna razón!";

        if(usuario.id == message.guild.ownerId) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` No puedes avisar al DUEÑO del Servidor!')
                .setColor('RED')
                .setTimestamp()
            ]
        })

        if(usuario.bot) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` No puedes avisar los bots!')
                .setColor('RED')
                .setTimestamp()
            ]
        })

        if(usuario.id === client.user.id) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` No me puedes avisar, intenta con otros!')
                .setColor('RED')
                .setTimestamp()
            ]
        })

        if (message.guild.me.roles.highest.position > usuario.roles.highest.position) {
            if (message.member.roles.highest.position > usuario.roles.highest.position) {
                usuario.send({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle(`📰 \`|\` Has sido avisado`)
                        .setDescription(`🛠 \`|\` Has sido avisado desde __${message.guild.name}__ por **${message.author.tag}**\n**Razón:** \n\`\`\`yml\n${reason}\`\`\``)
                        .setColor('DARK_GREY')
                        .setTimestamp()
                    ]
                }).catch(() => {
                    return message.channel.send({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setTitle('❌ `|` Error')
                            .setDescription('❌ `|` No se le ha podido enviar el DM al miembro!')
                            .setColor('RED')
                            .setTimestamp()
                        ]
                    })
                });
                warnSchema.findOne({ guildId: message.guild.id, userId: usuario.user.id }, async (err, data) => {
                    if(err) throw err;
                    if(!data) {
                        data = new warnSchema({
                            guildId: message.guild.id,
                            userId: usuario.id,
                            warnings: {
                                moderator: message.author.id,
                                time: Date.now(),
                                reason: reason
                            }
                        })
                    } else {
                        const objetos = {
                            moderator: message.author.id,
                            time: Date.now(),
                            reason: reason
                        }
                        data.warnings.push(objetos)
                    }
                    data.save()
                })
                message.reply({ 
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle(`✅ \`|\` Usuario avisado`)
                        .setDescription(`✔ \`|\` Se ha avisado exitosamente a \`${usuario.user.tag}\` *(\`${usuario.id}\`)* del servidor!`)
                        .addField(`❓ Razón`, `\n\`\`\`yml\n${reason}\`\`\``)
                        .setColor('PURPLE')
                        .setTimestamp()
                    ]
                })
            } else {
                return message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle('❌ `|` Error')
                        .setDescription('❌ `|` Tu Rol está por __debajo__ del miembro que quieres avisar!')
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
                    .setDescription('❌ `|` Mi Rol está por __debajo__ del miembro que quieres avisar!')
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
        .addField("🛠 Moderación", "\`\`\`warn\`\`\`")
        .addField("👨‍🔧 General", `🎇 \`|\` Nombre: **${usuario.user.username}**\n🆔 \`|\` ID: **${usuario.id}**\n🔨 \`|\` Warneado por: **${message.author.username}**\n❓ \`|\` Razon: ${reason}\n📅 \`|\` Dia: **${message.createdAt.toLocaleString()}**`)
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