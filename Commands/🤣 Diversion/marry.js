const Discord = require('discord.js');

module.exports = {
    name: 'marry',
    alias: [],
    desc: "Propone un matrimonio a alguien del servidor",
    usage: "marry <@miembro>",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 60,
    owner: false,

    async execute(client, message, args, prefix){

        const user = message.mentions.members.first() || client.guild.members.cache.get(args[0]);
        if(!user) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` Debes mencionar un miembro!')
                .setColor('RED')
                .setTimestamp()
            ]
        })
        const e = new Discord.MessageEmbed()
        .setTitle(`💍 \`|\` ${message.author.username} x ${user.user.username}`)
        .setDescription(`👰 \`|\` Le has propuesto matrimonio a **${user.user.username}**!`)
        .addField('✅ Para __Aceptar__', `Apreta al boton **Verde**`, true)
        .addField('❌ Para __Denegar__', `Apreta al boton **Rojo**`, true)
        .setFooter({ text: `Tienes 1 minuto para responder`, iconURL: user.user.displayAvatarURL({ dynamic: true }) })
        .setColor('WHITE')
        .setTimestamp()
        const ee = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setEmoji('✅')
            .setLabel('Aceptar')
            .setStyle('SUCCESS')
            .setCustomId('accept'),
            new Discord.MessageButton()
            .setEmoji('❌')
            .setLabel('Denegar')
            .setStyle('DANGER')
            .setCustomId('decline')
        )
        const msg = await message.reply({content: `<@${user.user.id}>`, embeds : [e] , components : [ee]})
        const f = i => i.customId === `accept` || i.customId === `decline`  && i.user.id === message.author.id
        const collector = message.channel.createMessageComponentCollector({ f, time: 60000 });

        collector.on("collect", async interaction => {
            if(interaction.user.id !== user.user.id) return interaction.reply({ content: `❌ | Solamente **${user.user.username}** puede apretar el boton`, ephemeral: true })
            if(interaction.customId === 'accept') {
                await interaction.deferUpdate();
                msg.edit({
                    content: null,
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle(`💍 \`|\` Matrimonio aceptado`)
                        .setDescription(`👰 \`|\` **${user.user.username}** aceptó tu matrimonio!`)
                        .setFooter({ text: `¡Felicidades!`, iconURL: user.user.displayAvatarURL({ dynamic: true }) })
                        .setColor('WHITE')
                        .setTimestamp()
                    ],
                    components: []
                })
            }
            if(interaction.customId === 'decline') {
                await interaction.deferUpdate();
                msg.edit({
                    content: null,
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle(`💍 \`|\` Matrimonio denegado`)
                        .setDescription(`👰 \`|\` **${user.user.username}** denego su matrimonio...`)
                        .setFooter({ text: `Suerte la proxima vez!`, iconURL: user.user.displayAvatarURL({ dynamic: true }) })
                        .setColor('WHITE')
                        .setTimestamp()
                    ],
                    components: [] 
                })
            }
        });

        collector.on('end', async () => {
            msg.edit({ content: `❌ | Tu tiempo se ha acabado, ${user.user.username} no aceptó en tiempo!`, embeds: [], components: [] }).catch(() => {})
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