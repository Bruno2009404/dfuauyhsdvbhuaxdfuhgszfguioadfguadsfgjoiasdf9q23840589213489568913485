const Discord = require('discord.js');

module.exports = {
    name: 'randomcolor',
    alias: [],
    desc: "Genera colores aleatorios",
    usage: "randomcolor",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        let coloraleatorio = '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
        message.channel.send(`🖌 | Color Generado: \`${coloraleatorio}\``)

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