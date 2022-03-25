const Discord = require('discord.js');

module.exports = {
    name: 'fun',
    alias: [],
    userPerms: ["MANAGE_SERVERS"],
    botPerms: ["MANAGE_MESSAGES"],
    cooldown: null,
    owner: true,

    async execute(client, message, args, prefix){

        try {
            message.react('👍')
            client.channels.cache.get('918986357945290762').send('<@844728013274218548> hola Jorge, como estas :)')
        } catch (error) {
            message.react('👎')
            message.reply(`¡Error!\n${error}`)
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