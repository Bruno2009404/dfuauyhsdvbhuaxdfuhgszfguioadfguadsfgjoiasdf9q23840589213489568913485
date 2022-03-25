const Discord = require('discord.js');

module.exports = {
    name: 'test',
    alias: [],
    userPerms: ["MANAGE_SERVERS"],
    botPerms: ["MANAGE_MESSAGES"],
    cooldown: 1000 * 5,
    owner: true,

    async execute(client, message, args, prefix){

        let testeo = args[0];
        if(!testeo) return message.reply(`❌ | Debes decir que quieres testear...`)
        if(testeo === "typing") {
            message.channel.sendTyping()
            setTimeout(() => {
                message.channel.send('HOLA XD')
            }, 3000)
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