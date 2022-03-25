const Discord = require('discord.js');

module.exports = {
    name: 'morse',
    alias: [],
    desc: "Cambia tu texto a codigo morse",
    usage: "morse <%texto>",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        let alpha = "ABCDEFGHIJLKMNOPQRSTUVWXYZ01234567890".split("")
            morse = "/,.-,-...,-.-.,-..,.,..-.,--.,....,..,.---,-.-,.-..,--,-.,---,.--.,--.-,.-.,...,-,..-,...-,.--,-..-,-.--,--..,.----,..---,...--,....-,.....,-....,--...,---..,----.,-----".split(",");
            text = args.slice(1).join(" ").toUpperCase();
            if(!text) return message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription('❌ `|` Debes decir el texto que quieres traducir a morse!')
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
        while (text.includes("Ä") || text.includes("Ō") || text.includes('Ū')) {
            text = text.replace("Ä", "AE").replace("Ō", "OE").replace('Ū', "UE");
        }
        if (text.startsWith(".") || text.startsWith("-") || text.startsWith(",")) {
            text = text.split(" ");
            let length = text.length;
            for (let i = 0; i < length; i++) {
                text[i] = alpha[morse.indexOf(text[i])];
            }
            text = text.join("");
        } else {
            text = text.split("");
            let length = text.length;
            for (let i = 0; i < length; i++) {
                text[i] = morse[alpha.indexOf(text[i])];
            }
            text = text.join(" ");
        }
        message.reply("```" + text + "```")

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