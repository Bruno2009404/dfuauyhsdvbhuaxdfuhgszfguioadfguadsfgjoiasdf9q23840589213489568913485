const Discord = require('discord.js');
const glob = require('glob');

module.exports = {
    name: 'reload',
    alias: [],
    userPerms: ["ADMINISTRATOR"],
    botPerms: ["MANAGE_MESSAGES"],
    cooldown: null,
    owner: true,

    async execute(client, message, args, prefix){

        client.commands.sweep(() => true);
        glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
            if(err) return console.log(err)
            filePaths.forEach(async (file) => {
                delete require.cache[require.resolve(file)];

                const pull = require(file)
                if(pull.name) {
                    client.commands.set(pull.name, pull);
                }
            });
        });
        console.log(`🤗 | Comandos reiniciados!`.brightCyan)
        return message.reply(`✅ | Comandos reiniciados con exito!`)

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