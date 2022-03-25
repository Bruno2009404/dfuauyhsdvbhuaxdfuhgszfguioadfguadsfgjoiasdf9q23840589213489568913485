const Discord = require('discord.js');
const simplydjs = require('simply-djs');

module.exports = {
    name: 'tictactoe',
    alias: ["3enraya"],
    desc: "El juego TicTacToe para jugar con amigos",
    usage: "tictactoe <@miembro>",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        simplydjs.tictactoe(message, {
            xEmoji: '<:4847blurplecheck:900425611946885230>',
            oEmoji: '<:1926blurplecross:900425611670061117>',
            idleEmoji: '<:5102blurpleline:900425611712028713>',
            embedColor: 'BLUE',
            embedFoot: 'Ciro | Bot Multifuncional',
            credits: false,
            timeoutEmbedColor: 'RED'
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