const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const warnSchema = require('../../Schemas/warns');
const bruno = require('../../Functions');

module.exports = {
    name: 'warnings',
    alias: ["warns"],
    desc: "Mira los warns que tiene una persona o tu",
    usage: "warnings [@miembro]",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const usuario =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        warnSchema.findOne({ guildId: message.guild.id, userId: usuario.id }, async (err, data) => {
            if(err) throw err;
            if(data) {
                const texto = data.warnings.map(
                    (warn, index) => `|================================|\nš \`|\` ID del Warn: \`${index}\`\nš \`|\` Fecha: <t:${Math.round(warn.time / 1000)}>\nšØ \`|\` Warneado por: <@${warn.moderator}>\nā \`|\` Razon: \`\`\`yml\n${warn.reason}\`\`\`\n`
                )
                bruno.pagination(client, message, {
                    titulo: `š  \`|\` \`[${data.warnings.length}]\` Warneos de ${usuario.user.tag}`,
                    texto: texto,
                    pages_elements: 1
                })
            } else {
                message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle('ā `|` Error')
                        .setDescription(`ā \`|\` Ese miembro no tiene warns!`)
                        .setColor('RED')
                        .setTimestamp()
                    ]
                })
            }
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