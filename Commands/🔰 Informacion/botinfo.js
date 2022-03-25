const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'botinfo',
    alias: ["info"],
    desc: "Muestra toda la información del Bot",
    usage: "botinfo",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        let comandos = client.commands.size;
        let slash = client.slashCommands.size;

        const embed = new Discord.MessageEmbed()
        .setTitle(`🤖 \`|\` Informacion de __${client.user.tag}__`)
        .setDescription('🥳 \`|\` Gracias por invitarme!')
        .setFields(
            {
                name: "🤖 General",
                value: `👷 \`|\` Creador: ${client.owner}\n👨‍🔧 \`|\` Moderador: ${client.mod}\n🕙 \`|\` Creado: **2/1/2022 23h 38m 23s**\n📊 \`|\` Servidores: **${client.guilds.cache.size}**\n🆔 \`|\` ID: **927390408089153576**\n🤖 \`|\` Nombre: **${client.user.username}**\n🗃 \`|\` Comandos: \`${comandos}\`\n📁 \`|\` Comandos Slash: \`${slash}\``,
                inline: true
            },
            {
                name: "🔨 Extra",
                value: `🗂 \`|\` Memoria: **${client.memory} MB**\n:lock: \`|\` Versión: ${client.version}\n⌚️ \`|\` Uptime: **${client.duration}**\n👨‍🔧 \`|\` Soporte: [\`Soporte aquí\`](https://discord.gg/kWW5H5TGdQ)`,
                inline: true
            },
        )
        .setColor('RANDOM')
        .setTimestamp()
        message.reply({ embeds: [embed], allowedMentions: { reliedUser: false } })

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