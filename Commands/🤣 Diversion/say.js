const Discord = require('discord.js');

module.exports = {
    name: 'say',
    alias: ["talk"],
    desc: "El bot dira lo que le digas",
    usage: "say <%texto>",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const texto = args.join(" ")
        message.reply(texto.replace(/@everyone/, "**everyone**").replace(/@here/, "**here**"))

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