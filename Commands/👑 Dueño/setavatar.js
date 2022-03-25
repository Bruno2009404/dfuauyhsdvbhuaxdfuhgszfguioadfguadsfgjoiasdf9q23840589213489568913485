const Discord = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');

module.exports = {
    name: 'setavatar',
    alias: ["sa", "changeavatar", "ca"],
    userPerms: ["MANAGE_SERVERS"],
    botPerms: ["MANAGE_MESSAGES"],
    cooldown: null,
    owner: true,

    async execute(client, message, args, prefix){

        const accion = args[0];
        if(!accion) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` Tienes que especificar si quieres \`navidad\`, \`halloween\` o \`link\`!')
                .setColor('RED')
                .setTimestamp()
            ]
        })
        if(accion === 'link') {
            let url = args.slice(1).join(" ")
            if(!url) return message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription('❌ `|` Tienes que especificar un link!')
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            try {
                const response = await fetch(url);
                const buffer = await response.buffer();
                client.user.setAvatar(buffer);
                return message.reply(`✅ | El avatar fue cambiado a \`${response}\``)
            } catch (e){
                message.channel.send({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle(`❌ \`|\` Error`)
                        .setDescription(`\`\`\`js\n${e.toString().substring(0, 2048)}\`\`\``)
                        .setColor("FF0000")
                        .setTimestamp()
                    ]
                })
            }
        } else if(accion === 'normal') {
            try {
                client.user.setAvatar(`https://cdn.discordapp.com/attachments/922338775730913290/955496791980257300/Ciro2.2.png`);
                return message.reply(`✅ | El avatar fue cambiado a \`Normal\``)
            } catch (e){
                message.channel.send({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle(`❌ \`|\` Error`)
                        .setDescription(`\`\`\`js\n${e.toString().substring(0, 2048)}\`\`\``)
                        .setColor("FF0000")
                        .setTimestamp()
                    ]
                })
            }
        } else if(accion === 'navidad') {
            try {
                client.user.setAvatar(`https://cdn.discordapp.com/attachments/922338775730913290/955506930439307274/CiroNavideno.png`);
                return message.reply(`✅ | El avatar fue cambiado a \`Navidad\``)
            } catch (e){
                message.channel.send({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle(`❌ \`|\` Error`)
                        .setDescription(`\`\`\`js\n${e.toString().substring(0, 2048)}\`\`\``)
                        .setColor("FF0000")
                        .setTimestamp()
                    ]
                })
            }
        } else if(accion === 'halloween') {
            try {
                client.user.setAvatar(`https://cdn.discordapp.com/attachments/922338775730913290/955506930133131294/CiroHalloweenesco.png`);
                return message.reply(`✅ | El avatar fue cambiado a \`Halloween\``)
            } catch (e){
                message.channel.send({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle(`❌ \`|\` Error`)
                        .setDescription(`\`\`\`js\n${e.toString().substring(0, 2048)}\`\`\``)
                        .setColor("FF0000")
                        .setTimestamp()
                    ]
                })
            }
        } else {
            return message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription('❌ `|` Esa categoria no existe!')
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