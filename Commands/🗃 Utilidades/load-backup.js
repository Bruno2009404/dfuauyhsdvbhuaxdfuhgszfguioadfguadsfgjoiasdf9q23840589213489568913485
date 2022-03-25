const Discord = require('discord.js');
const backup = require("discord-backup");

module.exports = {
    name: 'load-backup',
    alias: ["loadbackup", "backupload", "backup-load"],
    desc: "Carga el backup que acabas de crear",
    usage: "load-backup <%backup-codigo> <&backup-id>",
    userPerms: ["ADMINISTRATOR"],
    botPerms: ["ADMINISTRATOR"],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        let server = client.guilds.cache.get(args[0]);
        if (!server) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription(`❌ \`|\` Tienes que mencionar donde cargar el backup!\n\n> Escribe: \`${prefix}load-backup <ServerId> <BackupId>\``)
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            return;
        }
        let owner = await server.fetchOwner().catch(e => {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription(`❌ \`|\` No se ha encontrado el Dueño del servidor!`)
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            return;
        })
        let owner2 = await message.guild.fetchOwner().catch(e => {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription(`❌ \`|\` No se ha encontrado el Dueño de este servidor!`)
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            return;
        })
        if (owner.id != message.author.id || owner2.id != message.author.id) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription(`❌ \`|\` Debes ser Dueño de ambos servidores!`)
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            return;
        }
        client.backupDB.ensure(server.id, {
            backups: []
        })
        let backups = client.backupDB.get(server.id, "backups")
        if (!backups || backups.length == 0) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription(`❌ \`|\` No hay backup creada en **${server.name}**, crea una!`)
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
        }
        if (!args[1]) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription(`❌ \`|\` Se te ha olvidado poner la ID del backup!`)
                .setColor('RED')
                .setTimestamp()
            ]
        })
        if (isNaN(args[1]) || Number(args[1]) < 1 || Number(args[1]) > 5) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription(`❌ \`|\` La ID del backup debe estar entre 1 a 5!`)
                .setColor('RED')
                .setTimestamp()
            ]
        })
        if (backups.length < Number(args[1])) {
            return message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription(`❌ \`|\` La ID del backup que has escrito no existe!`)
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
        }
        let backupData = backups[Number(args[1]) - 1];
        if (!backupData) {
            return message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription(`❌ \`|\` La backup __mencionada__ no existe!`)
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
        }
        if (Array.isArray(backupData)) backupData = backupData[0];
        message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❓ \`|\` Cargar Backup')
                .setDescription('⚠️ \`|\` Esto va a cambiar todo el Servidor, No se puede deshacer!\n\n> Recomiendación antes de hacer esto, eliminar todos sus roles y emojis porque podrian haber problemas')
                .setColor('GREEN')
                .setTimestamp()
            ],
            components: [
                new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                    .setStyle("DANGER")
                    .setLabel("¿Continuar?")
                    .setCustomId("verified")
                    .setEmoji('❓')
                )
            ]
        }).then(msg => {
            const collector = msg.createMessageComponentCollector({
                filter: i => i?.isButton() && i?.message.author.id == client.user.id && i?.user,
                time: 90000
            })
            collector.on('collect', button => {
                if (button?.user.id === message.author.id) {
                    collector.stop();
                    button?.reply({ content: `⌛ | Cargado la backup de \`${server.name}\` a \`${message.guild.name}\`, por favor, espere..` }).catch(() => { })
                    backup.load(backupData, message.guild, {
                        clearGuildBeforeRestore: true
                    })
                }
            });
            collector.on('end', collected => {
                msg.edit({ components: [], embeds: [], content: `❌ | Tu tiempo se ha acabado, pong \`${prefix}load-backup\` de nuevo!` }).catch(() => { })
            });
        });

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