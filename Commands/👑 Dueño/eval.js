const Discord = require('discord.js');
const { inspect } = require("util");

module.exports = {
    name: 'eval',
    alias: [],
    userPerms: ["MANAGE_SERVERS"],
    botPerms: ["MANAGE_MESSAGES"],
    cooldown: null,
    owner: true,

    async execute(client, message, args, prefix){

        const code = args.join(" ")
        if(!code) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription(`❌ \`|\` Debes escribir un comando!`)
                .setColor('RED')
                .setTimestamp()
            ]
        })

        try {
            let evaled = await eval(code)
            let output = await inspect(evaled, {depth: 0 })
            let palabras = ["token", "destroy", "exit"];
            if(palabras.some(word => message.content.toLowerCase().includes(word))) {
                message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle('❌ `|` Error')
                        .setDescription(`❌ \`|\` Esa(s) palabra(s) esta(n) prohibida(s)!`)
                        .setColor('RED')
                        .setTimestamp()
                    ]
                })
                return;
            }
            message.react("✅")
            const evalEmbed = new Discord.MessageEmbed()
            .setColor('FUCHSIA')
            .setFields(
                { name: '📡 Tipo:', value: `\`\`\`prolog\n${typeof(evaled)}\`\`\``, inline: true },
                { name: '⏱ Evaluado en:', value: `\`\`\`yaml\n${Date.now() - message.createdTimestamp}ms\`\`\``, inline: true },
                { name: '🔚 Salida', value: `\`\`\`js\n${output}\`\`\`` },
            )
            .setTimestamp()
            message.reply({ embeds: [evalEmbed] })
        } catch (error) {
            message.react("❌")
            const evalFalloEmbed = new Discord.MessageEmbed()
            .setColor('RED')
            .setFields(
                { name: '<:Circulo:939333553227968602> Error', value: `\`\`\`js\n${error.toString().substring(0, 2048)}\`\`\`` },
                { name: '<:Circulo:939333553227968602> Evaluado en:', value: `\`\`\`yaml\n${Date.now() - message.createdTimestamp}ms\`\`\`` },
            )
            .setTimestamp()
            message.reply({ embeds: [evalFalloEmbed] })
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