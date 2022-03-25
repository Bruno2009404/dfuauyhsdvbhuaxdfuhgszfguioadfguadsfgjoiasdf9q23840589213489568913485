const Discord = require('discord.js');

module.exports = {
    name: 'number',
    alias: ["add"],
    desc: "Hace una suma de numero1 + numero2 = resultado",
    usage: "number <!numero1> <!numero2>",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const num1 = parseInt(args[0]);
        const num2 = parseInt(args[1]);

        const a = new Discord.MessageEmbed()
        .setTitle('❌ `|` Error')
        .setColor('RED')
        .setTimestamp()

        if(isNaN(num1) || num1 < 0 || !num1) {
            a.setDescription('❌ `|` Debes color un primer numero valido!')
            message.reply({
                embeds: [a]
            })
            return;
        } else if(isNaN(num2) || num2 < 0 || !num2) {
            a.setDescription('❌ `|` Debes color un segundo numero valido!')
            message.reply({
                embeds: [a]
            })
            return;
        }

        message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setDescription(`🏫 \`|\` ` + num1 + ` + ` + num2 + ` = ${num1+num2}`)
                .setColor('DARK_RED')
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