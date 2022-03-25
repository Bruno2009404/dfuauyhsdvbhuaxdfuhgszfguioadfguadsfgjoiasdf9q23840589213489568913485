const Discord = require('discord.js');
const day = require('dayjs');

module.exports = {
    name: 'channelinfo',
    alias: [],
    desc: "Muestra la información de un canal",
    usage: "channelinfo [#canal]",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 60,
    owner: false,

    async execute(client, message, args, prefix){

        const u = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
        let type = {
            "GUILD_TEXT": "Texto",
            "GUILD_VOICE": "Voz",
            "GUILD_NEWS": "Anuncio",
            "GUILD_STAGE_VOICE": "Escenario"
        }
        let nsfw = {
            "true": "Verdadero",
            "false": "Falso",
            "undefined": "Indefinido"
        }
        const fetchMessages = await message.channel.messages.fetch({ after: 1, limit: 1 });
        const mensaje = fetchMessages.first();
        if(mensaje.length > 512) {
            mensaje = mensaje.substring(0, 509)
            mensaje += '...'
        }
        const createsv = day(u.createdAt).format('DD/MM/YYYY');
        const ee = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setLabel(`Info General`)
            .setEmoji(`1️⃣`)
            .setCustomId(`giniral`)
            .setDisabled(true)
            .setStyle(`PRIMARY`),
            new Discord.MessageButton()
            .setLabel(`Info Descripción`)
            .setStyle(`PRIMARY`)
            .setEmoji(`2️⃣`)
            .setDisabled(false)
            .setCustomId(`descripcion`)
        );
        const e = new Discord.MessageEmbed()
        .setAuthor({ name: `${message.guild.name}`, iconURL: `${message.guild.iconURL({ dynamic : true })}` })
        .addField(`🤖 General`, `🎇 \`|\` Nombre: **${u.name}**\n🆔 \`|\` ID: **${u.id}**\n🚏 \`|\` Tipo: **${type[u.type]}**\n🗄 \`|\` Categoria: **${u.parent}**\n🆔 \`|\` ID de la Categoria: **${u.parent.id}**\n🕒 \`|\` Creado: **${createsv}**`, true)
        .addField(`🔨 Extra`, `🔞 \`|\` NSFW: **${nsfw[u.nsfw]}**\n💬 \`|\` Primer mensaje: **${mensaje.content}**\n👦 \`|\` Autor del primer mensahe: **${mensaje.author.tag}**\n🔂 \`|\` URL del primer mensaje: **${message.url}**`, true)
        .setColor(`RANDOM`)
        .setThumbnail(`${message.guild.iconURL({ dynamic : true })}`)
        const msg = await message.reply({embeds : [e] , components : [ee]})
        const f = i => i.customId === `giniral` || i.customId === `descripcion`  && i.user.id === message.author.id
        const c = message.channel.createMessageComponentCollector({ f, time: 60000 });
        c.on(`collect`, async i => {
            if (i.customId === 'giniral') {
                await i.deferUpdate()
                msg.edit({embeds : [e] , components : [ee]})
            }
            if(i.customId === `descripcion`) {
                await i.deferUpdate()
                const eeee = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                    .setLabel(`Info General`)
                    .setEmoji(`1️⃣`)
                    .setCustomId(`giniral`)
                    .setDisabled(false)
                    .setStyle(`PRIMARY`),
                    new Discord.MessageButton()
                    .setLabel(`Info Descripción`)
                    .setStyle(`PRIMARY`)
                    .setEmoji(`2️⃣`)
                    .setDisabled(true)
                    .setCustomId(`descripcion`)
                );
                const eee = new Discord.MessageEmbed()
                .setAuthor({ name: `${u.name}`, iconURL: `${message.guild.iconURL({ dynamic : true })}` })
                .addField(`💬 Descripción`, `\`\`\`${u.topic.substring(0, 2048) || "Sin descripción"}\`\`\``, true)
                .setColor(`RANDOM`)
                .setThumbnail(`${message.guild.iconURL({ dynamic : true })}`)
                msg.edit({embeds : [eee] , components : [eeee]})
            }
        })

        c.on('end', async () => {
            msg.edit({ content: `❌ | Tu tiempo se ha acabado, pon \`${prefix}channelinfo\` de vuelta!`, components: [] })
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