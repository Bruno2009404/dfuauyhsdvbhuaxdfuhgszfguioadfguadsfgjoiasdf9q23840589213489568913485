const Discord = require('discord.js');
const db = require('mongoose');

module.exports = {
    name: 'ping',
    alias: [],
    desc: "Mira el ping de la API y del bot en MS",
    usage: "ping",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        message.reply({
            content: "🔎 | Buscando ping..."
        }).then(async (reply) => {

            let Ping = Number(message.createdTimestamp)
            let pingBot = String(Number(reply.createdTimestamp - Ping))
            let ping = Math.floor(client.ws.ping);
      
            let pingApi;
            let PingBotNow;

            if(pingBot < 0) PingBotNow = `❓`;
            if(pingBot > 0) PingBotNow = `⚪`;
            if(pingBot > 100) PingBotNow = `🟢`;
            if(pingBot > 200) PingBotNow = `🟠`;
            if(pingBot > 300) PingBotNow = `🔴`;
            if(pingBot > 1000) PingBotNow = `⚠`;
            if(ping < 0) pingApi = `❓`;
            if(ping > 0) pingApi = `⚪`;
            if(ping > 100) pingApi = `🟢`;
            if(ping > 200) pingApi = `🟠`;
            if(ping > 300) pingApi = `🔴`;
            if(ping > 1000) PingBotNow = `⚠`;
      
            reply.edit({
                content: null,
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('🏓 \`|\` Pong')
                    .setColor('BLURPLE')
                    .setFields(
                        { name: `${PingBotNow} Bot Ping`, value: `\`\`\`${pingBot}ms\`\`\``, inline: true },
                        { name: `${pingApi} API Ping`, value: `\`\`\`${ping}ms\`\`\``, inline: true },
                    )
                    .setTimestamp()
                ],
            })
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