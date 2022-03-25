const Discord = require('discord.js');

module.exports = {
    name: 'userinfo',
    alias: [],
    desc: "Muestra la información de un miembro",
    usage: "userinfo [@miembro]",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 60,
    owner: false,

    async execute(client, message, args, prefix){

        const u = message.mentions.users.first() || client.guilds.cache.get(message.guild.id).users.cache.get(args[0]) || message.guild.users.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
        const uu = message.guild.members.cache.get(u.id)
        const ee = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setLabel(`Info General`)
            .setEmoji(`1️⃣`)
            .setCustomId(`main`)
            .setDisabled(true)
            .setStyle(`PRIMARY`),
            new Discord.MessageButton()
            .setLabel(`Info de Roles`)
            .setStyle(`PRIMARY`)
            .setEmoji(`2️⃣`)
            .setDisabled(false)
            .setCustomId(`roles`),
            new Discord.MessageButton()
            .setLabel(`Permisos`)
            .setStyle(`PRIMARY`)
            .setEmoji(`3️⃣`)
            .setDisabled(false)
            .setCustomId(`permissions`)
        );
        let estado = {
            "online": "Conectado",
            "offline": "Desconectado",
            "dnd": "No molestar",
            "idle": "Ausente",
            "undefined": "Indefinido"
        }
        const e = new Discord.MessageEmbed()
        .setAuthor({ name: `${u.username}`, iconURL: `${u.displayAvatarURL({ dynamic : true})}` })
        .addField(`🤖 General`, `🎇 \`|\` Nombre: **${u.username}**\n🆔 \`|\` ID: **${u.id}**\n🕒 \`|\` Creado: <t:${parseInt(u.createdAt / 1000)}:R>\n🏃 \`|\` Se unio: <t:${parseInt(uu.joinedAt / 1000)}:R>`, true)
        .addField(`🔨 Extra`, `👨 \`|\` Apodo: **${uu.nickname || `Ninguno`}**\n🛑 \`|\` Estado: **${estado[uu.presence?.status]}**`, true)
        .setColor(`RANDOM`)
        .setThumbnail(`${u.displayAvatarURL({size : 1024 , dynamic : true})}`)
        const msg = await message.reply({embeds : [e] , components : [ee]})
        const f = i => i.customId === `main` || i.customId === `roles`  && i.u.id === message.author.id
        const c = message.channel.createMessageComponentCollector({ f, time: 60000 });
        c.on(`collect`, async i => {
            if (i.customId === 'main') {
                await i.deferUpdate()
                msg.edit({embeds : [e] , components : [ee]})
            }
            if(i.customId === `roles`) {
                await i.deferUpdate()
                const eeee = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                    .setLabel(`info General`)
                    .setEmoji(`1️⃣`)
                    .setCustomId(`main`)
                    .setDisabled(false)
                    .setStyle(`PRIMARY`),
                    new Discord.MessageButton()
                    .setLabel(`Info de Roles`)
                    .setStyle(`PRIMARY`)
                    .setEmoji(`2️⃣`)
                    .setDisabled(true)
                    .setCustomId(`roles`),
                    new Discord.MessageButton()
                    .setLabel(`Permisos`)
                    .setStyle(`PRIMARY`)
                    .setDisabled(false)
                    .setEmoji(`3️⃣`)
                    .setCustomId(`permissions`)
                ); 
                const eee = new Discord.MessageEmbed()
                .setAuthor({ name: `${u.username}`, iconURL: `${u.displayAvatarURL({ dynamic : true})}` })
                .addField(`🔘 Roles`, `${uu.roles.cache.map(r => r).sort((first, second) => second.position - first.position).join(`, `) || "Sin roles"}`, true)
                .addField(`⬆ Rol mas alto`, `${uu.roles.highest || "Sin rol alto"}`, true)
                .setColor(`RANDOM`)
                .setThumbnail(`${u.displayAvatarURL({size : 1024 , dynamic : true})}`)
                msg.edit({embeds : [eee] , components : [eeee]})
            }
            if(i.customId === `permissions`) {
                await i.deferUpdate()
                const eeeee = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                    .setLabel(`info General`)
                    .setEmoji(`1️⃣`)
                    .setCustomId(`main`)
                    .setDisabled(false)
                    .setStyle(`PRIMARY`),
                    new Discord.MessageButton()
                    .setLabel(`Info de Roles`)
                    .setStyle(`PRIMARY`)
                    .setEmoji(`2️⃣`)
                    .setDisabled(false)
                    .setCustomId(`roles`),
                    new Discord.MessageButton()
                    .setLabel(`Permisos`)
                    .setStyle(`PRIMARY`)
                    .setDisabled(true)
                    .setEmoji(`3️⃣`)
                    .setCustomId(`permissions`)
                );
                const eee2= new Discord.MessageEmbed()
                .setAuthor({ name: `${u.username}`, iconURL: `${u.displayAvatarURL({ dynamic : true})}` })
                .addField(`📜 Permisos`, `\`\`\`${uu.permissions.toArray().join(', ') || "Sin permisos"}\`\`\``, true)
                .setColor(`RANDOM`)
                .setThumbnail(`${u.displayAvatarURL({size : 1024 , dynamic : true})}`)
                msg.edit({embeds : [eee2] , components : [eeeee]})
            }
        })

        c.on('end', async () => {
            msg.edit({ content: `❌ | Tu tiempo se ha acabado, pon \`${prefix}userinfo\` de vuelta!`, components: [] })
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