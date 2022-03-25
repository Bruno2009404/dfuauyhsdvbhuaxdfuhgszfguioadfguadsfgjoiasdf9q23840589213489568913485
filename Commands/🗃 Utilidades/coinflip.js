const Discord = require('discord.js');

module.exports = {
    name: 'coinflip',
    alias: ["coin-flip"],
    desc: "Gira una moneda",
    usage: "coinflip",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const sides = ["Head", "tail"]
        let random = sides[Math.floor(Math.random() * sides.length)];
        if(random === 'Head') {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('<:Moneda:956277646008913940> \`|\` Ha caido en \`Cara\`')
                    .setColor('YELLOW')
                    .setImage(`https://cdn.discordapp.com/attachments/922338775730913290/956286192347934741/Cara.gif`)
                    .setTimestamp()
                ]
            })
            return;
        } else {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('<:Moneda:956277646008913940> \`|\` Ha caido en \`Cola\`')
                    .setColor('YELLOW')
                    .setImage(`https://cdn.discordapp.com/attachments/922338775730913290/956286192725405796/Cola.gif`)
                    .setTimestamp()
                ]
            })
            return;
        }

    }

}