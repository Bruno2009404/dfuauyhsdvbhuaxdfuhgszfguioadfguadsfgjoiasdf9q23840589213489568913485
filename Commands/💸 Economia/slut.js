const Discord = require('discord.js');
const ecoSchema = require('../../Schemas/economyDB');

module.exports = {
    name: 'slut',
    alias: [],
    desc: "Haces un delito para ganar mas dinero",
    usage: "slut",
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
        let posiblidades = ["ganar", "perder"]
        let resultado = posiblidades[Math.floor(Math.random() * posiblidades.length)];
        let dineroo = Math.floor(Math.random() * 1000)
        let dinerooo = Math.floor(Math.random() * data.dinero)
        if(resultado === "ganar") {
            await ecoSchema.findOneAndUpdate({ userId: message.author.id }, {
                $inc: {
                    dinero: dineroo
                }
            })
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
                    .setDescription(`🎉 \`|\` Has robado y recibiste \`$${dineroo}\`!`)
                    .setColor('GREEN')
                    .setTimestamp()
                ]
            })
        } else {
            if(data.dinero <= 0) {
                message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
                        .setDescription(`🚫 \`|\` Intentaste robar pero no tenes nada de dinero para dar!`)
                        .setColor('RED')
                        .setTimestamp()
                    ]
                })
            } else {
                await ecoSchema.findOneAndUpdate({ userId: message.author.id }, {
                    $inc: {
                        dinero: -dinerooo
                    }
                })
                message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
                        .setDescription(`🚫 \`|\` Intentaste robar y te quitaron \`$${dinerooo}\`!`)
                        .setColor('RED')
                        .setTimestamp()
                    ]
                })
            }
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