const Discord = require('discord.js');
const day = require('dayjs');

module.exports = {
    name: 'roleinfo',
    alias: [],
    desc: "Muestra la información de un rol",
    usage: "roleinfo <@rol>",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 60,
    owner: false,

    async execute(client, message, args, prefix){

        const u = message.mentions.roles.first() || client.guilds.cache.get(message.guild.id).roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
        if(!u) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription('❌ `|` Debes mencionar un rol!')
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            return;
        }
        const status = {
            false: "No es mencionable",
            true: "Si es mencionable"
        };
        const permissions = u.permissions.toArray().map(perm => {
        return perm
            .toLowerCase()
            .replace(/_/g, " ")
            .replace(/\w\S*/g, txt => {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        });
        const createsv = day(u.createdAt).format('DD/MM/YYYY');
        const ee = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setLabel(`Info General`)
            .setEmoji(`1️⃣`)
            .setCustomId(`gonoral`)
            .setDisabled(true)
            .setStyle(`PRIMARY`),
            new Discord.MessageButton()
            .setLabel(`Info Permisos`)
            .setStyle(`PRIMARY`)
            .setEmoji(`2️⃣`)
            .setDisabled(false)
            .setCustomId(`pirmisis`)
        );
        const e = new Discord.MessageEmbed()
        .setAuthor({ name: `${u.name}`, iconURL: `${message.guild.iconURL({ dynamic : true })}` })
        .addField(`🤖 General`, `🎇 \`|\` Nombre: **${u.name}**\n🆔 \`|\` ID: **${u.id}**\n🟢 \`|\` Hex: **${u.hexColor}**\n🔅 \`|\` Color: **${u.color}**\n👦 \`|\` Miembros: **${u.members.size}**\n🕒 \`|\` Creado: **${createsv}**`, true)
        .addField(`🔨 Extra`, `⬆ \`|\` Posicion: **${u.position}**\n🔘 \`|\` Mencionable: **${status[u.mentionable]}**`, true)
        .setColor(`RANDOM`)
        .setThumbnail(`${message.guild.iconURL({ dynamic : true })}`)
        const msg = await message.reply({embeds : [e] , components : [ee]})
        const f = i => i.customId === `gonorol` || i.customId === `pirmisis`  && i.user.id === message.author.id
        const c = message.channel.createMessageComponentCollector({ f, time: 60000 });
        c.on(`collect`, async i => {
            if (i.customId === 'gonorol') {
                await i.deferUpdate()
                msg.edit({embeds : [e] , components : [ee]})
            }
            if(i.customId === `pirmisis`) {
                await i.deferUpdate()
                const eeee = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                    .setLabel(`Info General`)
                    .setEmoji(`1️⃣`)
                    .setCustomId(`gonorol`)
                    .setDisabled(false)
                    .setStyle(`PRIMARY`),
                    new Discord.MessageButton()
                    .setLabel(`Info Permisos`)
                    .setStyle(`PRIMARY`)
                    .setEmoji(`2️⃣`)
                    .setDisabled(true)
                    .setCustomId(`pirmisis`)
                );
                const eee = new Discord.MessageEmbed()
                .setAuthor({ name: `${u.name}`, iconURL: `${message.guild.iconURL({ dynamic : true })}` })
                .addField(`📜 Permisos`, `\`\`\`${permissions.join(", ") || "Sin permisos"}\`\`\``, true)
                .setColor(`RANDOM`)
                .setThumbnail(`${message.guild.iconURL({ dynamic : true })}`)
                msg.edit({embeds : [eee] , components : [eeee]})
            }
        })

        c.on('end', async () => {
            msg.edit({ content: `❌ | Tu tiempo se ha acabado, pon \`${prefix}roleinfo\` de vuelta!`, components: [] })
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