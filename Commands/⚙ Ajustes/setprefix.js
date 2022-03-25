const Discord = require('discord.js');
const prefixx = require('../../Schemas/prefixDB');

module.exports = {
    name: 'setprefix',
    alias: ["prefix", "prefijo"],
    desc: "Cambia el prefijo del Bot",
    usage: "setprefix <%prefijo>",
    userPerms: ["ADMINISTRATOR"],
    botPerms: ["MANAGE_GUILD"],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const mensaje = args[0]
        if(!mensaje) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('📡 `|` Prefijos')
                    .setDescription(`👍 \`|\` Estos son mis prefijos!\n\n\`${prefix}\`, \`<@${client.user.id}>\` y \`ciro\``)
                    .setColor('AQUA')
                    .setTimestamp()
                ]
            })
            return;
        }
        if (mensaje.length > 4) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription(`❌ \`|\` El prefijo debe ser de menos de 4 carácteres!`)
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            return;
        } else {
            if (/\p{Emoji}/gu.test(args[0])) return message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription('❌ `|` No se puede establecer emojis como prefix!')
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            if(args[1]) return message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription('❌ `|` Error 404')
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle(`:gear: \`|\` Prefijo`)
                    .setColor('#FF457D')
                    .setDescription(`✅ \`|\` El prefijo del servidor ha sido cambiado de **${prefix}** a **${mensaje}**, ej: **${mensaje}help**`)
                    .setTimestamp()
                ]
            })
            await prefixx.findOneAndUpdate({ guildId: message.guild.id }, {
                prefix: mensaje
            })
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