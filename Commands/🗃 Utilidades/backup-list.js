const Discord = require('discord.js');
const backup = require("discord-backup");
const moment = require("moment");
require('moment-duration-format');

module.exports = {
    name: 'backup-list',
    alias: ["backuplist", "list-backup", "listbackup"],
    desc: "Mira todos los backups que has creado",
    usage: "backup-list [$servidor]",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        let server = client.guilds.cache.get(args[0]) || message.guild;

        client.backupDB.ensure(server.id, {
            backups: []
        })
        let backups = client.backupDB.get(server.id, "backups")
        if (!backups || backups.length == 0) {
            return message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription(`❌ \`|\` No hay backups en **${server.name}**!`)
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
        }
        message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`⚖ \`|\` Backups de ${server.name}`)
                .setThumbnail(server.iconURL({ dynamic: true }))
                .setDescription(backups.sort((a, b) => b?.createdTimestamp - a.createdTimestamp).map((b, index) => `> Creado el: \`${moment(b?.createdTimestamp).format("DD/MM/YYYY HH:mm")}\`\n> Roles: \`${b?.roles.length}\`\n> Canales: \`${(b?.channels.categories && b?.channels.categories.length > 0 ? b?.channels.categories.map(c => c.children.length).reduce((a, b) => a + b) : 0) + b?.channels.categories.length + b?.channels.others.length}\`\n> \`${prefix}load-backup ${server.id} ${index + 1}\`\n`).join("\n"))
                .setTimestamp()
            ]
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