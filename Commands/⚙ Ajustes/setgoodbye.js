const Discord = require('discord.js');
const db = require('megadb');
const goodbye = new db.crearDB('goodbye');

module.exports = {
    name: 'setgoodbye',
    alias: [],
    desc: "Establece un canal de despedidas personalizado",
    usage: "setgoodbye",
    userPerms: ["ADMINISTRATOR"],
    botPerms: ["MANAGE_GUILD"],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const quemensaje = await message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle("❓ \`|\` Pregunta Nº1")
                .setDescription("❓ \`|\` ¿Que mensaje quieres en las despedidas?\n\n> **Utilidades:**\n*{user}* = Menciona al miembro\n*{server}* = Dice el nombre del servidor\n*{userid}* = Muestra el miembro con su ID\n*{membercount}* = Muestra cuantos miembros estan en el servidor\n*{username}* = Muestra el nombre del miembro\n*{usertag}* = Muestra el nombre y el tag del miembro")
                .setColor("RED")
                .setTimestamp()
            ]
        });
        await quemensaje.channel.awaitMessages({
            filter: m=> m.author.id === message.author.id,
            max: 1,
            errors: ["time"],
            time: 180e3
        }).then(async collected => {
            var message = collected.first();
            goodbye.set(`GoodbyeMessage-${message.guild.id}`, `${message.content}`);
            const quefondo = await message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle("❓ \`|\` Pregunta Nº2")
                    .setDescription("❓ \`|\` ¿Que fondo quieres en la imagen de despedidas?\n\n> Solo manda la imagen (La imagen debe ser de este tamaño: 800x350)")
                    .setColor("RED")
                    .setTimestamp()
                ]
            });
            await quefondo.channel.awaitMessages({
                filter: m=> m.author.id === message.author.id,
                max: 1,
                errors: ["time"],
                time: 180e3
            }).then(async collected => {
                var message = collected.first();
                const image = message.attachments.first();
                if(!image) return message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle('❌ `|` Error')
                        .setDescription('❌ `|` Eso no es una imagen!')
                        .setColor('RED')
                        .setTimestamp()
                    ]
                })
                goodbye.set(`GoodbyeBackground-${message.guild.id}`, `${image.url}`);
                const quenombre = await message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle("❓ \`|\` Pregunta Nº3")
                        .setDescription("❓ \`|\` ¿Que tipo de nombre quieres en la imagen de Despedidas?\n\n> **Solo escribe algunas de estas 2 opciones:**\n*username* = Muestra solo el nombre del miembro\n*usertag* = Muestra solo el nombre y tag del miembro")
                        .setColor('RED')
                        .setTimestamp()
                    ]
                });
                await quenombre.channel.awaitMessages({
                    filter: m=> m.author.id === message.author.id,
                    max: 1,
                    errors: ["time"],
                    time: 180e3
                }).then(async collected => {
                    var message = collected.first();
                    if(message.content !== 'username' || message.content !== 'usertag') {
                        return message.reply({
                            embeds: [
                                new Discord.MessageEmbed()
                                .setTitle('❌ `|` Error')
                                .setDescription('❌ `|` Esa opción no es valida!')
                                .setColor('RED')
                                .setTimestamp()
                            ]
                        })
                    }
                    goodbye.set(`GoodbyeName-${message.guild.id}`, `${message.content}`);
                    const quemensajedeimagen = await message.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setTitle("❓ \`|\` Pregunta Nº4")
                            .setDescription("❓ \`|\` ¿Que primer mensaje de Despedidas quieres en la imagen?\n\n> **Utilidades:**\n*{server}* = Dice el nombre del servidor\n*{userid}* = Muestra el miembro con su ID\n*{membercount}* = Muestra cuantos miembros estan en el servidor\n*{username}* = Muestra el nombre del miembro\n*{usertag}* = Muestra el nombre y el tag del miembro")
                            .setColor('RED')
                            .setTimestamp()
                        ]
                    });
                    await quemensajedeimagen.channel.awaitMessages({
                        filter: m=> m.author.id === message.author.id,
                        max: 1,
                        errors: ["time"],
                        time: 180e3
                    }).then(async collected => {
                        var message = collected.first();
                        goodbye.set(`GoodbyeImageMessage1-${message.guild.id}`, `${message.content}`);
                        const quemensajedeimagen2 = await message.reply({
                            embeds: [
                                new Discord.MessageEmbed()
                                .setTitle("❓ \`|\` Pregunta Nº5")
                                .setDescription("❓ \`|\` ¿Que segundo mensaje de Despedidas quieres en la imagen?\n\n> **Utilidades:**\n*{server}* = Dice el nombre del servidor\n*{userid}* = Muestra el miembro con su ID\n*{membercount}* = Muestra cuantos miembros estan en el servidor\n*{username}* = Muestra el nombre del miembro\n*{usertag}* = Muestra el nombre y el tag del miembro")
                                .setColor('RED')
                                .setTimestamp()
                            ]
                        });
                        await quemensajedeimagen2.channel.awaitMessages({
                            filter: m=> m.author.id === message.author.id,
                            max: 1,
                            errors: ["time"],
                            time: 180e3
                        }).then(async collected => {
                            var message = collected.first();
                            goodbye.set(`GoodbyeImageMessage2-${message.guild.id}`, `${message.content}`);
                            const quecanal = await message.reply({
                                embeds: [
                                    new Discord.MessageEmbed()
                                    .setTitle("❓ \`|\` Pregunta Nº6")
                                    .setDescription("❓ \`|\` ¿En que canal quieres que se mande las Despedidas?\n\n> Solo mencionalo o di su ID")
                                    .setColor('RED')
                                    .setTimestamp()
                                ]
                            });
                            await quecanal.channel.awaitMessages({
                                filter: m=> m.author.id === message.author.id,
                                max: 1,
                                errors: ["time"],
                                time: 180e3
                            }).then(async collected => {
                                var message = collected.first();
                                const channel = message.guild.channels.cache.get(message.content) || message.mentions.channels.first();
                                if(channel) {
                                    goodbye.set(`GoodbyeChannel-${message.guild.id}`, `${message.content}`);
                                    message.reply(`✅ | El sistema de Despedidas fue configurado perfectamente!\n\n> Si el sistema de Despedidas no funciona, significa que algo pusiste mal, vuelve a intentarlo!`)
                                    return;
                                } else {
                                    return message.reply({
                                        embeds: [
                                            new Discord.MessageEmbed()
                                            .setTitle('❌ `|` Error')
                                            .setDescription('❌ `|` No se ha encontrado el canal que has especificado!')
                                            .setColor('RED')
                                            .setTimestamp()
                                        ]
                                    })
                                }
                            }).catch(() => {
                                return message.reply({
                                    embeds: [
                                        new Discord.MessageEmbed()
                                        .setDescription("❌ | El tiempo ha expirado!")
                                        .setColor('RED')
                                    ]
                                })
                            })
                        }).catch(() => {
                            return message.reply({
                                embeds: [
                                    new Discord.MessageEmbed()
                                    .setDescription("❌ | El tiempo ha expirado!")
                                    .setColor('RED')
                                ]
                            })
                        })
                    }).catch(() => {
                        return message.reply({
                            embeds: [
                                new Discord.MessageEmbed()
                                .setDescription("❌ | El tiempo ha expirado!")
                                .setColor('RED')
                            ]
                        })
                    })
                }).catch(() => {
                    return message.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setDescription("❌ | El tiempo ha expirado!")
                            .setColor('RED')
                        ]
                    })
                })
            }).catch(() => {
                return message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setDescription("❌ | El tiempo ha expirado!")
                        .setColor('RED')
                    ]
                })
            })
        }).catch(() => {
            return message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setDescription("❌ | El tiempo ha expirado!")
                    .setColor('RED')
                ]
            })
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