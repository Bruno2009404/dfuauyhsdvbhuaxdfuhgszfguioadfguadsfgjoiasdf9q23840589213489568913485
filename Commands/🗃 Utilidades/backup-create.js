const Discord = require('discord.js');
const backup = require("discord-backup");

module.exports = {
    name: 'backup-create',
    alias: ["create-backup", "backupcreate", "createbackup"],
    desc: "Carga un backup para guardar todo tu servidor",
    usage: "backup-create",
    userPerms: ["ADMINISTRATOR"],
    botPerms: ["ADMINISTRATOR"],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        let owner = await message.guild.fetchOwner().catch(e => {
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
        if (owner.id != message.author.id) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription(`❌ \`|\` Tienes que ser Dueño de este servidor!`)
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            return;
        }
        client.backupDB.ensure(message.guild.id, {
            backups: []
        })
        message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('⚖ \`|\` Cargar Backup')
                .setDescription('❓ \`|\` ¿Estas seguro que quieres crear este backup?')
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
            collector.on('collect', async (button) => {
                if (button?.user.id === message.author.id) {
                    collector.stop();
                    button?.reply({ embeds: [
                        new Discord.MessageEmbed()
                        .setTitle('✅ \`|\` Guardando Backup')
                        .setDescription('⚖ \`|\` Los backups pueden tardar entre 1 a 2 minutos en cargar!')
                        .setColor('AQUA')
                        .setTimestamp()
                    ] }).catch(() => { })
                    backup.create(message.guild, {
                        maxMessagesPerChannel: 10,
                        jsonSave: false,
                        saveImages: "base64",
                        jsonBeautify: true
                    }).then((backupData) => {
                        let backups = client.backupDB.get(message.guild.id, "backups")
                        backups.push(backupData);
                        backups = backups.sort((a, b) => b?.createdTimestamp - a.createdTimestamp)
                        if (backups.length > 5) backups = backups.slice(0, 5);
                        client.backupDB.set(message.guild.id, backups, "backups")
                        message.author.send(`✅ | Backup creada!\n\nPara cargarla escribe:\n> \`${prefix}load-backup ${message.guild.id} 1\` ... nota 1 es el primer backup, el mayor numero (5) es el ultimo creado \`${prefix}list-backups ${message.guild.id}\`!`).catch(e => {
                            message.channel.send(`✅ | Backup creada!\n\nPara cargarla escribe:\n> \`${prefix}load-backup ${message.guild.id} 1\` ... nota 1 es el primer backup, el mayor numero (5) es el ultimo creado \`${prefix}list-backups ${message.guild.id}\`!`);
                        }).then(() => {
                            message.reply({
                                embeds: [
                                    new Discord.MessageEmbed()
                                    .setTitle('✅ \`|\` Backup Guardado')
                                    .setDescription(`✅ \`|\` Backup creada!, La ID de backup fue enviada a tu DM!`)
                                    .setColor('GREEN')
                                    .setTimestamp()
                                ]
                            });
                        })
                    }).catch(e => {
                        console.log(e.stack ? String(e.stack).grey : String(e).grey)
                    })
                }
            });
            collector.on('end', collected => {
                msg.edit({ components: [], embeds: [], content: `❌ | Tu tiempo se ha acabado, pon \`${prefix}backup-create\` de nuevo!` }).catch(() => { })
            });
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