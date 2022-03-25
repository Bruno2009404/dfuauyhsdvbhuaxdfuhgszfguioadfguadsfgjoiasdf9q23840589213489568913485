const Discord = require('discord.js');
const Zalgo = require('to-zalgo');

module.exports = {
    name: 'zalgo',
    alias: [],
    desc: "Muestra el texto que dijiste raro",
    usage: "zalgo <&mensaje>",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const f = args.join(" ")
        if(!f) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription(`❌ \`|\` Debes escribir un texto!`)
                .setColor('RED')
                .setTimestamp()
            ]
        })

        const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`${Zalgo(f)}`)
        .setTimestamp()
        message.reply({ embeds: [embed] })

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