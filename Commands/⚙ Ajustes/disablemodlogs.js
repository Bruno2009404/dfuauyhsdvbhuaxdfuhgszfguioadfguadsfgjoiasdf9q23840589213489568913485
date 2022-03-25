const Discord = require('discord.js');
const qdb = require('quick.db');

module.exports = {
    name: 'disablemodlogs',
    alias: [],
    desc: "Desabilita el canal de modlogs",
    usage: "disablemodlogs",
    userPerms: ["ADMINISTRATOR"],
    botPerms: ["MANAGE_GUILD"],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        let b = await qdb.fetch(`modlog_${message.guild.id}`);

        if(!b) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription('❌ `|` No hay canal de modlogs establecido!')
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            return;
        } else {
            qdb.delete(`modlog_${message.guild.id}`)
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle(`:gear: \`|\` ModLogs`)
                    .setColor('#FF457D')
                    .setDescription(`✅ \`|\` El canal Modlog ha sido desabilitada!`)
                    .setTimestamp()
                ],
            })
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