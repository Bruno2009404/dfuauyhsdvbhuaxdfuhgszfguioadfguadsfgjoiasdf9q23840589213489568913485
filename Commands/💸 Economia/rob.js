const Discord = require('discord.js');
const ecoSchema = require('../../Schemas/economyDB');

module.exports = {
    name: 'rob',
    alias: ["steal"],
    desc: "Roba a un miembro su dinero",
    usage: "rob <@miembro>",
    userPerms: [],
    botPerms: [],
    cooldown: 60000 * 180,
    owner: false,

    async execute(client, message, args, prefix){

        const miembro = message.mentions.members.first() || message.guild.members.cache.find((a) => a.user.tag.toLowerCase().includes(args[0]?.toLocaleLowerCase() ?? '') || a.user.username.toLowerCase().includes(args[0]?.toLocaleLowerCase() ?? '') || a.displayName.toLowerCase().includes(args[0]?.toLowerCase() ?? '') ) || message.guild.members.cache.get(args[0]?.toLowerCase() ?? '');
        if(!miembro) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription('❌ `|` Debes mencionar un miembro!')
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
        } else {
            let data_user = await ecoSchema.findOne({ userId: miembro.id });
            let data = await ecoSchema.findOne({ userId: message.author.id });
            if(!data) {
                data = new ecoSchema({
                    userId: message.author.id
                })
                data.save()
            } else if(!data_user) {
                data = new ecoSchema({
                    userId: miembro.id
                })
                data.save()
            }
            let dineroo = Math.floor(Math.random() * data_user.dinero)
            let diner0 = Math.floor(Math.random() * data.dinero)
            if(dineroo <= 0) {
                return message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle('❌ `|` Error')
                        .setDescription('❌ `|` El miembro no tiene dinero!')
                        .setColor('RED')
                        .setTimestamp()
                    ]
                })
            }
            let posiblidades = ["ganar", "perder"]
            let resultado = posiblidades[Math.floor(Math.random() * posiblidades.length)];
            if(resultado === 'ganar') {
                await ecoSchema.findOneAndUpdate({ userId: message.author.id }, {
                    $inc: {
                        dinero: dineroo
                    }
                })
                await ecoSchema.findOneAndUpdate({ userId: miembro.id }, {
                    $inc: {
                        dinero: -dineroo
                    }
                })
                message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
                        .setDescription(`🏃‍♂️ \`|\` Le has robado \`$${dineroo}\` a **${miembro.user.username}**`)
                        .setColor('GREEN')
                        .setTimestamp()
                    ]
                })
            } else {
                await ecoSchema.findOneAndUpdate({ userId: message.author.id }, {
                    $inc: {
                        dinero: -diner0
                    }
                })
                message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
                        .setDescription(`🏃‍♂️ \`|\` Le has intentado robar a **${miembro.user.username}** y perdiste \`$${diner0}\``)
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