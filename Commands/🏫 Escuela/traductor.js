const Discord = require('discord.js');
const translate = require('@vitalets/google-translate-api');
const bruno = require('../../Functions');

module.exports = {
    name: 'traductor',
    alias: ["traduc", "tra"],
    desc: "Traduce cualquier texto a un idioma a otro idioma",
    usage: "traductor <%idioma1> <%idioma2> <%texto>",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const lang0 = args[0];
        if(!lang0) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` Debes decirme un idioma!')
                .setColor('RED')
                .setTimestamp()
            ]
        })
        const lang1 = args[1];
        if(!lang1) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` Debes decirme otro idioma')
                .setColor('RED')
                .setTimestamp()
            ]
        })

        const string = args.slice(2).join(" ");
        if(!string) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` Debes decirme un mensaje para traducir!')
                .setColor('RED')
                .setTimestamp()
            ]
        })
        translate(string, {from: lang0, to: lang1}).then(res => {
            const translated = String(res.text)
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('🌐 \`|\` Traducción')
                    .setDescription(`🗺 \`|\` Esta es la traduccion de \`${lang0}\` a \`${lang1}\`.`)
                    .setFields(
                        { name: "💬 Mensaje",
                            value: `\`\`\`${string.substring(0, 512)}\`\`\``
                        },
                        {
                            name: "<:Traducir:955599763372396554> Traducción",
                            value: `\`\`\`${translated}\`\`\``
                        }
                    )
                    .setColor('RANDOM')
                    .setTimestamp()
                ]
            })
        }).catch(errT => {})

    }

}