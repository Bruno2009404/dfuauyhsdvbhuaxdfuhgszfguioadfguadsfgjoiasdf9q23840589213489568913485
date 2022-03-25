const Discord = require('discord.js');
const qdb = require('quick.db');

module.exports = {
    name: 'setmodlogs',
    alias: [],
    desc: "Establece un canal para logear los comandos de moderación usados del Bot",
    usage: "setmodlogs <#canal>",
    userPerms: ["ADMINISTRATOR"],
    botPerms: ["MANAGE_GUILD"],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        if (!args[0]) {
            let b = await qdb.fetch(`modlog_${message.guild.id}`);
            let channelName = message.guild.channels.cache.get(b);
            if (message.guild.channels.cache.has(b)) {
                return message.reply(
                    `🤗 | El canal Modlog establecido en este servidor es \`${channelName.name}\`!`
                );
            } else {
                return message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle('❌ `|` Error')
                        .setDescription(`❌ \`|\` Menciona el canal o ID para configurar!`)
                        .setColor('RED')
                        .setTimestamp()
                    ]
                })
            }
        }
        let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!channel || channel.type !== 'GUILD_TEXT') return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription(`❌ \`|\` Por favor, ingrese un canal valido!`)
                .setColor('RED')
                .setTimestamp()
            ]
        })

        try {
            let a = await qdb.fetch(`modlog_${message.guild.id}`)

            if (channel.id === a) {
                return message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle('❌ `|` Error')
                        .setDescription(`❌ \`|\` Este canal ya está configurado como canal Modlog!`)
                        .setColor('RED')
                        .setTimestamp()
                    ]
                })
            } else {
                client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("✅ | El canal Modlog fue establecido aqui con exito!")
                qdb.set(`modlog_${message.guild.id}`, channel.id)

                message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle(`:gear: \`|\` ModLogs`)
                        .setColor('#FF457D')
                        .setDescription(`✅ \`|\` El canal Modlog se ha configurado correctamente en \`${channel.name}\`!`)
                        .setTimestamp()
                    ],
                })
            }
        } catch (e) {
            console.error(e)
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