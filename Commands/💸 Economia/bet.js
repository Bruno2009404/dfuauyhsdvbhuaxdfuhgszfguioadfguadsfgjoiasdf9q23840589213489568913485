const Discord = require('discord.js');
const ecoSchema = require('../../Schemas/economyDB');

module.exports = {
    name: 'bet',
    alias: [],
    desc: "Aposta una cantidad maxima de dinero para ganar mas dinero",
    usage: "bet <!cantidad>",
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
        if(data.dinero <= 0) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription('❌ `|` No puedes apostar cuando no tienes dinero')
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            return;
        }
        if(["all", "todo", "all-in"].includes(args[0])) {
            cantidad = data.dinero
        } else {
            if(isNaN(cantidad) || cantidad <= 0 || cantidad % 1 != 0) {
                message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle('❌ `|` Error')
                        .setDescription(`❌ \`|\` No has especificado una cantidad valida para apostar!`)
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
                        .setDescription(`❌ \`|\` No puedes apostar mas dinero de lo que tienes!`)
                        .setColor('RED')
                        .setTimestamp()
                    ]
                })
                return;
            }
        }
        let posiblidades = ["ganar", "perder"]
        let resultado = posiblidades[Math.floor(Math.random() * posiblidades.length)];
        if(resultado === "ganar") {
            await ecoSchema.findOneAndUpdate({ userId: message.author.id }, {
                $inc: {
                    dinero: cantidad
                }
            })
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
                    .setDescription(`🎉 \`|\` Has ganado y recibiste \`$${cantidad}\`!`)
                    .setColor('GREEN')
                    .setTimestamp()
                ]
            })
        } else {
            await ecoSchema.findOneAndUpdate({ userId: message.author.id }, {
                $inc: {
                    dinero: -cantidad
                }
            })
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
                    .setDescription(`🚫 \`|\` Has perdido y te quitaron \`$${cantidad}\`!`)
                    .setColor('RED')
                    .setTimestamp()
                ]
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