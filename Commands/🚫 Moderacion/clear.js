const Discord = require('discord.js');
const qdb = require('quick.db')
const ms = require('ms');

module.exports = {
    name: 'clear',
    alias: ["purge"],
    desc: "Limpia todos los mensajes que quieras eliminar de un canal",
    usage: "clear <!cantidad>",
    userPerms: ["MANAGE_SERVER"],
    botPerms: ["MANAGE_MESSAGES"],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        if (!args[0]) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` Escriba la cantidad de mensajes para eliminar!')
                .setColor('RED')
                .setTimestamp()
            ]
        })
        let cantidad = parseInt(args[0]);

        if (!cantidad || isNaN(cantidad)) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` Debes introducir un numero valido!')
                .setColor('RED')
                .setTimestamp()
            ]
        })

        if (cantidad > 100) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription('❌ `|` El maximo de mensajes que puedo borrar es 100!, por lo tanto lo establecere automaticamente ahi...')
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            cantidad = 100;
        }

        const messages = await message.channel.messages.fetch({ limit: cantidad });
        const filtered = messages.filter((msg) => Date.now() - msg.createdTimestamp < ms("14 days"));
        const days = messages.filter((msg) => Date.now() - msg.createdTimestamp > ms("14 days"));

        let mensaje = ``;
        if(filtered.size <= 1) {
            mensaje = `mensaje`
        } else if(filtered.size > 1) {
            mensaje = `mensajes`
        }

        if(days.size === 0) {
            message.delete().then(async () => {
                await message.channel.bulkDelete(filtered.size).then(() => {
                    message.channel.send(`✅ | He borrado **${filtered.size}** ${mensaje} con exito!`).then((message) => {
                        setTimeout(() => {
                            message.delete()
                        }, 10000)
                    });
                })
            })
        }

        if(filtered.size === 0) {
            return message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription('❌ `|` No se ha podido borrar ningun mensaje porque superan los 14 dias!')
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
        }

        if(days.size >= 1) {
            message.delete().then(async () => {
                await message.channel.bulkDelete(filtered.size).then(() => {
                    message.channel.send(`✅ | He borrado **${filtered.size}** ${mensaje} con exito ya que los otros mensajes que has pedido superan los 14 dias!`).then((message) => {
                        setTimeout(() => {
                            message.delete()
                        }, 10000)
                    });
                })
            })
        }
        let maximo;
        if(filtered.size >= '100') {
            maximo = "(Cantidad Máxima)"
        } else {
            maximo = "(Cantidad Aceptable)"
        }

        let channel = qdb.fetch(`modlog_${message.guild.id}`)
        if (channel == null) return;
        if (!channel) return;
        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: `${message.guild.name} Modlogs`, iconURL: `${message.guild.iconURL()}` })
        .setColor("RANDOM")
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setFooter({ text: `${message.guild.name}`, iconURL: `${message.guild.iconURL()}` })
        .addField("🛠 Moderación", "\`\`\`clear\`\`\`")
        .addField("👨‍🔧 General", `🎇 \`|\` Cantidad: **${filtered.size}** __${maximo}__\n🔨 \`|\` Mensajes eliminados por: **${message.author.username}**\n📅 \`|\` Dia: **${message.createdAt.toLocaleString()}**`)
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