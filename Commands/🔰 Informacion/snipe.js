const Discord = require('discord.js');
const snipe = require('../../Schemas/snipeSchema')

module.exports = {
    name: 'snipe',
    alias: [],
    desc: "Muestra el ultimo mensaje eliminado de un canal",
    usage: "snipe",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const data = await snipe.findOne({ channelId: message.channel.id })

        if(!data){
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription(`❌ \`|\` No se a borrado ningún mensaje!`)
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            return;
        }
        let mensaje;
        if(data.content.length > 512) {
            mensaje = data.content.substring(0, 509)
            mensaje += '...'
        } else {
            mensaje = `>>> ${data.content}`
        }
        let snipeEmbed = new Discord.MessageEmbed()
        .setTitle(`♻ \`|\` Snipe`)
        .setDescription(`👇 \`|\` Este fue el último mensaje borrado de <#${data.channelId}>`)
        .addField(`💬 Mensaje`, `${mensaje || "**__SIN MENSAJE__**"}`)
        .addField(`✨ General`, `👨‍🔧 \`|\` Autor: <@${data.author}> (\`${data.author.replace(/</, "").replace(/@/, "").replace(/>/, "")}\`)\n🕒 \`|\` Tiempo: <t:${data.time}:R>`, true)
        .addField(`🔨 Extra`, `🖼 \`|\` Imagen: **${data.image || "**__SIN IMAGEN__**"}**\n📌 \`|\` Mencionó a: **${String('<@'+data.mention+'>').replace(/<@null>/, "**__SIN MENCIÓN__**")}**`, true)
        .setColor('GREEN')
        .setTimestamp()
        if(data.image) snipeEmbed.setImage(data.image)
        message.reply({ embeds: [snipeEmbed] })
      
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