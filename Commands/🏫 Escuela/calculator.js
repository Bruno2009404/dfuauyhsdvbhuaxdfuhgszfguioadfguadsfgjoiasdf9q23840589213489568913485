const Discord = require('discord.js');
const simplydjs = require('simply-djs');

module.exports = {
    name: 'calculator',
    alias: ["calc"],
    desc: "Una calculadora simple y facil",
    usage: "calculator",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        simplydjs.calculator(message, {
            embedColor: "BLUE",
            embedFooter: "Calculadora v1.0"
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