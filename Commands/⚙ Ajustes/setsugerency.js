const Discord = require('discord.js');
const setupSchema = require('../../Schemas/setup');

module.exports = {
    name: 'setsugerency',
    alias: ["setsug", "setsuggestion"],
    desc: "Establece un canal de sugerencias",
    usage: "setsugerency <#canal>",
    userPerms: ["ADMINISTRATOR"],
    botPerms: ["MANAGE_GUILD"],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if(!channel) {
            return message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription('❌ `|` El canal que has puesto no es valido!')
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
        } else {
            await setupSchema.findOneAndUpdate({ guildId: message.guild.id }, {
                sugerencySystem: channel.id
            })
            const embed = new Discord.MessageEmbed()
            .setTitle(`:gear: \`|\` Sugerencias`)
            .setColor('#FF457D')
            .setDescription(`✅ \`|\` El canal de sugerencias fue extablecido a <#${channel.id}>!`)
            .setFooter({ text: `Para usarlo solo escribe un mensaje en ese canal o pon \"${prefix}sugerency\"`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTimestamp()
            message.reply({
                embeds: [embed]
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