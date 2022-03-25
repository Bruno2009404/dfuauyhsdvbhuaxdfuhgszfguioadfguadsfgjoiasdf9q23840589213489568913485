const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const snipe = require('../../Schemas/snipeSchema');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('snipe')
    .setDescription('♻ Muestra el ultimo mensaje borrado'),

    async execute(client, interaction){

        const data = await snipe.findOne({ channelId: interaction.channel.id })

        if(!data){
            interaction.reply({
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
            mensaje = `>>> ${data.content.substring(0, 509)}`
            mensaje += '...'
        } else {
            mensaje = `>>> ${data.content}`
        }
        let snipeEmbed = new Discord.MessageEmbed()
        .setTitle(`♻ \`|\` Snipe`)
        .setDescription(`👇 \`|\` Este fue el último mensaje borrado de <#${data.channelId}>`)
        .addField(`💬 Mensaje`, `${mensaje || "**__SIN MENSAJE__**"}`)
        .addField(`✨ General`, `👨‍🔧 \`|\` Autor: <@${data.author}> (\`${data.author.replace(/</, "").replace(/@/, "").replace(/>/, "")}\`)\n🕒 \`|\` Tiempo: <t:${data.time}:R>\n🆔 \`|\` ID: **${data.id}**`, true)
        .addField(`🔨 Extra`, `🖼 \`|\` Imagen: **${data.image || "**__SIN IMAGEN__**"}**\n📌 \`|\` Mencionó a: **${String('<@'+data.mention+'>').replace(/<@null>/, "**__SIN MENCIÓN__**")}**`, true)
        .setColor('GREEN')
        .setTimestamp()
        if(data.image) snipeEmbed.setImage(data.image)
        interaction.reply({ embeds: [snipeEmbed] })

    }

}