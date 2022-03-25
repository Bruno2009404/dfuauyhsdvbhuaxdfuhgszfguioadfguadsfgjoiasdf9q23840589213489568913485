const Discord = require('discord.js');

module.exports = {
    name: 'gettoken',
    alias: [],
    desc: "Consigue el token de mentira de un bot",
    usage: "gettoken <@bot>",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
        if(args.length < 1) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription(`❌ \`|\` Necesitas mencionar un bot o decir su ID!`)
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            return;
        }
        m = args[0]; m = m.replace("<", ""); m = m.replace("@", ""); m = m.replace("!", ""); m = m.replace(">", ""); c = 0
        if(!m.match(/^[0-9]+$/)) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription(`❌ \`|\` Bot no válido, menciónalo o deci su ID!`)
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            return;
        }
        if(m === client.user.id) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription(`❌ \`|\` No me puedes sacar el token!`)
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            return;
        }
        message.reply(`:mag_right: | Buscando token de <@${m}>... \`(${c}/10)\``).then(async reply => {
            await delay(1000)
            c++
            for (var count = 0; count < 10; count++) {
                reply.edit({ content: `:mag_right: | Buscando token de <@${m}>... \`(${c}/10)\`` })
                await delay(1000)
                c++
            }
            canToken = "a-b-c-d-e-f-g-h-i-j-k-l-m-n-o-p-q-r-s-t-v-w-x-y-z"
            canToken = canToken.slice().trim().split(/-+/g)
            t = ""
            for(var count = 0; count < 20; count++) {
                if(Math.floor(Math.random() * 2) === 0) {
                    t += canToken[Math.floor(Math.random() * canToken.length)]
                } else {
                    t += canToken[Math.floor(Math.random() * canToken.length)].toUpperCase()
                }
            }; t += "."
            for(var count = 0; count < 5; count++) {
                if(Math.floor(Math.random() * 2) === 0) {
                    t += canToken[Math.floor(Math.random() * canToken.length)]
                } else {
                    t += canToken[Math.floor(Math.random() * canToken.length)].toUpperCase()
                }
            }; t += ".-_"
            for(var count = 0; count < 18; count++) {
                if(Math.floor(Math.random() * 2) === 0) {
                    t += canToken[Math.floor(Math.random() * canToken.length)]
                } else {
                    t += canToken[Math.floor(Math.random() * canToken.length)].toUpperCase()
                }
            }
            reply.edit({ content: `:warning: | Token encontrado: \`${t}\`` })
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