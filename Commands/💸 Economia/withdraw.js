const Discord = require('discord.js');
const ecoSchema = require('../../Schemas/economyDB');

module.exports = {
    name: 'withdraw',
    alias: ["with", "retirar"],
    desc: "Saca tu dinero del banco",
    usage: "withdraw <!cantidad>",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        let cantidad = args[0];
        let data = await ecoSchema.findOne({ userId: message.author.id });
        if(!data) {
            data = new ecoSchema({
                userId: message.author.id
            })
            data.save()
        }
        if(["all", "todo", "all-in"].includes(args[0])) {
            if(cantidad === 0) return message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription('❌ `|` No puedes guardar dinero porque tienes \`$0\`!')
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            cantidad = data.banco
        } else {
            if(isNaN(cantidad) || cantidad <= 0 || cantidad % 1 != 0) {
                message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle('❌ `|` Error')
                        .setDescription(`❌ \`|\` No has especificado una cantidad valida para retirar!`)
                        .setColor('RED')
                        .setTimestamp()
                    ]
                })
                return;
            }
            if(cantidad > data.dinero) {
                message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle('❌ `|` Error')
                        .setDescription(`❌ \`|\` No puedes sacar mas dinero de lo que tienes!`)
                        .setColor('RED')
                        .setTimestamp()
                    ]
                })
                return;
            }
        }
        await ecoSchema.findOneAndUpdate({ userId: message.author.id }, {
            $inc: {
                banco: -cantidad,
                dinero: cantidad
            }
        })
        message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
                .setDescription(`🗃 \`|\` Has retirado \`$${cantidad}\` de tu cuenta`)
                .setColor('GREEN')
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
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