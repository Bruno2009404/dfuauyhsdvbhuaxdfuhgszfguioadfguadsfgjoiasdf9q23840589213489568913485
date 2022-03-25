const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    alias: [],
    desc: "Expulsa a alguien del servidor",
    usage: "kick <@miembro> [%razon]",
    userPerms: ["ADMINISTRATOR", "KICK_MEMBERS"],
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

        let razon = args.slice(1).join(" ") || "No se ha especificado ninguna razón!";

        if(usuario.id == message.guild.ownerId) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` No puedes expulsar al DUEÑO del Servidor!')
                .setColor('RED')
                .setTimestamp()
            ]
        })

        if (message.guild.me.roles.highest.position > usuario.roles.highest.position) {
            if (message.member.roles.highest.position > usuario.roles.highest.position) {
                usuario.send({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle(`📰 \`|\` Has sido expulsado`)
                        .setDescription(`🛠 \`|\` Has sido expulsado de __${message.guild.name}__\n**Razón:** \n\`\`\`yml\n${razon}\`\`\``)
                        .setColor('DARK_GREY')
                        .setTimestamp()
                    ]
                }).catch(() => {
                    return message.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setTitle('❌ `|` Error')
                            .setDescription('❌ `|` No se le ha podido enviar el DM al miembro!')
                            .setColor('RED')
                            .setTimestamp()
                        ]
                    })
                });

                usuario.kick([razon]).then(message => {
                    return message.reply({ 
                        embeds: [
                            new Discord.MessageEmbed()
                            .setTitle(`✅ \`|\` Usuario expulsado`)
                            .setDescription(`✔ \`|\` Se ha expulsado exitosamente a \`${usuario.user.tag}\` *(\`${usuario.id}\`)* del servidor!**`)
                            .addField(`❓ Razón`, `\n\`\`\`yml\n${razon}\`\`\``)
                            .setColor('PURPLE')
                            .setTimestamp()
                        ]
                    })
                }).catch(() => {
                    return message.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setTitle('❌ `|` Error')
                            .setDescription('❌ `|` No he podido expulsar al miembro!')
                            .setColor('RED')
                            .setTimestamp()
                        ]
                    })
                });
            } else {
                return message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle('❌ `|` Error')
                        .setDescription('❌ `|` Tu Rol está por __debajo__ del miembro que quieres expulsar!')
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
                    .setDescription('❌ `|` Mi Rol está por __debajo__ del miembro que quieres expulsar!')
                    .setColor('RED')
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