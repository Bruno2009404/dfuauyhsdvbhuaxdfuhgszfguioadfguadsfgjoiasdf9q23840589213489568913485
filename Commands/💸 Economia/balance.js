const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ecoSchema = require('../../Schemas/economyDB');

module.exports = {
    name: 'balance',
    alias: ["bal", "money", "wallet"],
    desc: "Mira todo el dinero que tienes",
    usage: "balance [@miembro]",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if(user.bot) {
            message.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription(`❌ \`|\` El usuario no debe ser un bot!`)
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
        }
        let data = await ecoSchema.findOne({ userId: user.id });
        if(!data) {
            data = new ecoSchema({
                userId: message.author.id
            })
            data.save()
        }
        message.reply({
            embeds: [
                new MessageEmbed()
                .setAuthor({ name: `${user.user.tag}`, iconURL: `${user.displayAvatarURL({ dynamic: true })}` })
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                .setDescription(`💼 \`|\` Este es el dinero de **${user.user.username}**!`)
                .setFields(
                    {
                        name: '💸 Dinero',
                        value: `\`$${data.dinero}\``,
                        inline: true
                    },
                    {
                        name: '🏦 Banco',
                        value: `\`$${data.banco}\``,
                        inline: true
                    },
                    {
                        name: '➕ Total',
                        value: `\`$${data.dinero + data.banco}\``,
                        inline: true
                    },
                )
                .setColor('AQUA')
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