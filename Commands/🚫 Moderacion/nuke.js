const Discord = require('discord.js');

module.exports = {
    name: 'nuke',
    alias: [],
    desc: "Elimina y remplaza el canal sin mensajes",
    usage: "",
    userPerms: ["ADMINISTRATOR"],
    botPerms: ["MANAGE_SERVERS"],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        let link = "https://media.giphy.com/media/HhTXt43pk1I1W/giphy.gif"
        var posicion = message.channel.position
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setCustomId('zi')
            .setStyle('SUCCESS')
            .setLabel('Confirmar')
            .setEmoji('✅'),
            new Discord.MessageButton()
            .setCustomId('nao')
            .setStyle('DANGER')
            .setLabel('Cancelar')
            .setEmoji('⛔')
        )
        const e = new Discord.MessageEmbed()
        .setTitle('🤯 \`|\` Nuckear canal')
        .setDescription('❓ \`|\` ¿Seguro de queres nukear este canal?')
        .setFooter({ text: 'Tienes 1 minuto para responder'})
        .setColor('BLUE')
        .setTimestamp()
        const a = new Discord.MessageEmbed()
        .setTitle('😉 \`|\` Nuke cancelado')
        .setDescription(`🧨 \`|\` Nuke cancelado correctamente!`)
        .setColor('RED')
        .setTimestamp()
        const msg = await message.reply({ embeds: [e], components: [row] })
        const filtro = i => i.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter: filtro, time: 60000 })
        collector.on('collect', async i => {
            if(i.customId === 'zi'){
                message.channel.clone().then((canal) => {
                    message.channel.delete()
                    canal.setPosition(posicion)
                    canal.send({ 
                        content: "🧨 | Canal nukeado!",
                        files: [
                            new Discord.MessageAttachment(link , "nuke.gif")
                        ]
                    })
                })
            }
            if(i.customId === 'nao'){
                await i.deferUpdate()
                i.editReply({ embeds: [a] , components: [] })
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