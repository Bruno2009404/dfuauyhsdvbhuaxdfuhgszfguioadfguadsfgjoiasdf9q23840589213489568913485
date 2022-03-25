const Discord = require('discord.js');

module.exports = {
    name: 'shell',
    alias: [],
    userPerms: ["MANAGE_SERVERS"],
    botPerms: ["MANAGE_MESSAGES"],
    cooldown: null,
    owner: true,

    async execute(client, message, args, prefix){

        const argumentos = args.join(' ');
        if(!argumentos) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` Debes decirme que quieres escribir en la consola')
                .setColor('RED')
                .setTimestamp()
            ]
        })
        const msg = await message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setDescription('<a:Cargando:945489957370355754> | Cargando...')
                .setTimestamp()
                .setColor('RANDOM')
            ]
        })
        const c = require('child_process');
        await c.exec(argumentos, (error, stdout) => { 
            let result = (stdout || error)
            var command = String(result, {code: "asciidoc", split: '\n'})
            if(String(command).toLowerCase().includes('err')) {
                msg.edit({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle('❌ \`|\` Error')
                        .setDescription(`\`\`\`js\n${command}\`\`\``)
                        .setTimestamp()
                        .setColor('RED')
                    ]
                })
            } else {
                msg.edit({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setDescription(`\`\`\`js\n${command}\`\`\``)
                        .setTimestamp()
                        .setColor('GREEN')
                    ]
                })
            }
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