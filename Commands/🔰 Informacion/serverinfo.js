const Discord = require('discord.js');
const day = require('dayjs');

module.exports = {
    name: 'serverinfo',
    alias: [],
    desc: "Muestra la información de un servidor",
    usage: "serverinfo",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 60,
    owner: false,

    async execute(client, message, args, prefix){

        const u = message.guild;
        const createsv = day(u.createdAt).format('DD/MM/YYYY');
        const  { guild, author } = message;
        const voiceChannels = u.channels.cache.filter(c => c.type === 'GUILD_VOICE');
        let count = 0;
        let count2 = 0;
        let seguridad; //NONE, LOW, MEDIUM , HIGH , VERY_HIGH
        const perm = message.guild.verificationLevel;
        if(perm === "NONE"){
            seguridad = "Ninguno";
        }
        if(perm === "LOW"){
            seguridad = "Bajo";
        };
        if(perm === "MEDIUM"){
            seguridad = "Medio";
        };
        if(perm === "HIGH"){
            seguridad = "Alto";
        };
        if(perm === "VERY_HIGH"){
            seguridad = "Muy alto";
        };
        for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
        for (const [id, voiceChannel] of voiceChannels)
        count2 += voiceChannel.members.filter(m => m.user.bot).size;
        const ee = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setLabel(`Info General`)
            .setEmoji(`1️⃣`)
            .setCustomId(`general`)
            .setDisabled(true)
            .setStyle(`PRIMARY`),
            new Discord.MessageButton()
            .setLabel(`Info Canales`)
            .setStyle(`PRIMARY`)
            .setEmoji(`2️⃣`)
            .setDisabled(false)
            .setCustomId(`channels`),
            new Discord.MessageButton()
            .setLabel(`Info Roles`)
            .setStyle(`PRIMARY`)
            .setEmoji(`3️⃣`)
            .setDisabled(false)
            .setCustomId(`rolesxd`)
        );
        const e = new Discord.MessageEmbed()
        .setAuthor({ name: `${u.name}`, iconURL: `${u.iconURL({ dynamic : true })}` })
        .addField(`🤖 General`, `🎇 \`|\` Nombre: **${u.name}**\n🆔 \`|\` ID: **${u.id}**\n🕒 \`|\` Creado: **${createsv}**\n👷 \`|\` Creador(a): <@${u.ownerId}>\n👱 \`|\` Miembros: **${u.memberCount}**\n🤖 \`|\` Bots: **${u.members.cache.filter(m => m.user.bot).size}**\n😀 \`|\` Emojis: **${u.emojis.cache.size}**`, true)
        .addField(`🔨 Extra`, `👱 \`|\` Miembros en llamada: **${count}**\n🤖 \`|\` Bots en llamada: **${count2}**\n🆔 \`|\` ID del Creador(a): **${u.ownerId}**\n💎 \`|\` Boosts: **${u.premiumSubscriptionCount || '0'}**\n🔐 \`|\` Nivel de verificación: **${seguridad}**`, true)
        .setColor(`RANDOM`)
        .setThumbnail(`${u.iconURL({ dynamic : true})}`)
        const msg = await message.reply({embeds : [e] , components : [ee]})
        const f = i => i.customId === `general` || i.customId === `channels`  && i.user.id === message.author.id
        const c = message.channel.createMessageComponentCollector({ f, time: 60000 });
        c.on(`collect`, async i => {
            if (i.customId === 'general') {
                await i.deferUpdate()
                msg.edit({embeds : [e] , components : [ee]})
            }
            if(i.customId === `channels`) {
                await i.deferUpdate()
                const eeee = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                    .setLabel(`Info General`)
                    .setEmoji(`1️⃣`)
                    .setCustomId(`general`)
                    .setDisabled(false)
                    .setStyle(`PRIMARY`),
                    new Discord.MessageButton()
                    .setLabel(`Info Canales`)
                    .setStyle(`PRIMARY`)
                    .setEmoji(`2️⃣`)
                    .setDisabled(true)
                    .setCustomId(`channels`),
                    new Discord.MessageButton()
                    .setLabel(`Info Roles`)
                    .setStyle(`PRIMARY`)
                    .setEmoji(`3️⃣`)
                    .setDisabled(false)
                    .setCustomId(`rolesxd`)
                );
                const eee = new Discord.MessageEmbed()
                .setAuthor({ name: `${u.name}`, iconURL: `${u.iconURL({ dynamic : true})}` })
                .addField(`🛠 Canales`, `🗄 \`|\` Categorias: **${u.channels.cache.filter((x) => x.type == "GUILD_CATEGORY").size}**\n🔊 \`|\` Canales de voz: **${u.channels.cache.filter((x) => x.type == "GUILD_VOICE").size}**\n💬 \`|\` Canales de texto: **${u.channels.cache.filter((x) => x.type == "GUILD_TEXT").size}**`, true)
                .addField(`🗂 Total`, `🗃 \`|\` Canales totales: **${u.channels.cache.size}**`, true)
                .setColor(`RANDOM`)
                .setThumbnail(`${u.iconURL({ dynamic : true})}`)
                msg.edit({embeds : [eee] , components : [eeee]})
            }
            if(i.customId === `rolesxd`) {
                await i.deferUpdate()
                const eeeee = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                    .setLabel(`Info General`)
                    .setEmoji(`1️⃣`)
                    .setCustomId(`general`)
                    .setDisabled(false)
                    .setStyle(`PRIMARY`),
                    new Discord.MessageButton()
                    .setLabel(`Info Canales`)
                    .setStyle(`PRIMARY`)
                    .setEmoji(`2️⃣`)
                    .setDisabled(false)
                    .setCustomId(`channels`),
                    new Discord.MessageButton()
                    .setLabel(`Info Roles`)
                    .setStyle(`PRIMARY`)
                    .setEmoji(`3️⃣`)
                    .setDisabled(true)
                    .setCustomId(`rolesxd`)
                );
                const eee2= new Discord.MessageEmbed()
                .setAuthor({ name: `${u.name}`, iconURL: `${u.iconURL({ dynamic : true})}` })
                .addField(`🔘 Roles`, `${u.roles.cache.map((g) => `<@&${g.id}>`).join(', ') || "Sin roles"}`, true)
                .addField(`🔢 Totales`, `🗃 \`|\` Roles: **${u.roles.cache.size}**`, true)
                .setColor(`RANDOM`)
                .setThumbnail(`${u.iconURL({ dynamic : true})}`)
                msg.edit({embeds : [eee2] , components : [eeeee]})
            }
        })

        c.on('end', async () => {
            msg.edit({ content: `❌ | Tu tiempo se ha acabado, pon \`${prefix}serverinfo\` de vuelta!`, components: [] })
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