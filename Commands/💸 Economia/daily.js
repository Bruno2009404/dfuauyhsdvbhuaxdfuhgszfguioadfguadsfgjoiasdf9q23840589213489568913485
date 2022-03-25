const Discord = require('discord.js');
const ecoSchema = require('../../Schemas/economyDB');

module.exports = {
    name: 'daily',
    alias: [],
    desc: "Consigues tu recompensa radia",
    usage: "daily",
    userPerms: [],
    botPerms: [],
    cooldown: 60000 * 60,
    owner: false,

    async execute(client, message, args, prefix){

        let data = await ecoSchema.findOne({ userId: message.author.id });
        if(!data) {
            data = new ecoSchema({
                userId: message.author.id
            })
            data.save()
        }
        let dineroo = Math.floor(Math.random() * 500)
        await ecoSchema.findOneAndUpdate({ userId: message.author.id }, {
            $inc: {
                dinero: dineroo
            }
        })
        message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
                .setDescription(`👜 \`|\` Has reclamado \`$${dineroo}\` de tu recompensa!`)
                .setColor('GREEN')
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