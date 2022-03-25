const Discord = require('discord.js');
const ecoSchema = require('../../Schemas/economyDB');

module.exports = {
    name: 'addmoney',
    alias: ["add-money", "give-money", "givemoney"],
    desc: "Añade dinero a un miembro",
    usage: "addmoney <@miembro> <!cantidad>",
    userPerms: ["ADMINISTRATOR"],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let cantidad = args[1];
        let data = await ecoSchema.findOne({ userId: user.user.id });
        if(!data) {
            data = new ecoSchema({
                userId: user.user.id
            })
            data.save()
        }
        if(!user || isNaN(cantidad) || cantidad <= 0 || cantidad % 1 != 0) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription(`❌ \`|\` No has especificado una cantidad valida para dar!\n\n\`o\`\n\n❌ \`|\` Debes mencionar un miembro!`)
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            return;
        }
        await ecoSchema.findOneAndUpdate({ userId: user.id }, {
            $inc: {
                dinero: cantidad
            }
        })
        message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
                .setDescription(`🗃 \`|\` Le has dado \`$${cantidad}\` a **${user.user.username}**`)
                .setColor('GREEN')
                .setThumbnail(user.displayAvatarURL({ dynamic: true }))
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