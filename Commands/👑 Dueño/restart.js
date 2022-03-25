const Discord = require('discord.js');
const db = require('megadb');
const restart = new db.crearDB('restart')

module.exports = {
    name: 'restart',
    alias: [],
    userPerms: ["MANAGE_SERVERS"],
    botPerms: ["MANAGE_MESSAGES"],
    cooldown: null,
    owner: true,

    async execute(client, message, args, prefix){

        const msg = await message.channel.send('❗ | Restaurando Bot, espera...')
        const c = require('child_process');
        client.destroy()
        restart.establecer('restart', message.guild.id)
        c.execSync('node .', { encoding: 'utf8' })
        if(restart.tiene('restart')) {
            msg.edit('✔ | Restablecido con exito!')
            restart.eliminar('restart')
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