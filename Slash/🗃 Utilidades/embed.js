const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('⚗ Crea un embed')
    .addStringOption(option =>
        option
        .setName('title')
        .setDescription('⚗ El titulo')
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName('description')
        .setDescription('⚗ La descripción')
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName('color')
        .setDescription('⚗ El color')
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName('footer')
        .setDescription('⚗ El pie del embed')
        .setRequired(true)
    )
    .addChannelOption(option =>
        option
        .setName('channel')
        .setDescription('⚗ El canal donde mandara el embed')
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName('content')
        .setDescription('⚗ El contenido')
        .setRequired(false)
    ),

    async execute(client, interaction){

        const a = interaction.options.getString('title');
        const b = interaction.options.getString('description');
        const c = interaction.options.getString('color');
        const d = interaction.options.getString('footer');
        const e = interaction.options.getChannel('channel');
        const f = interaction.options.getString('content');

        if(f) {
            interaction.guild.channels.cache.get(e.id).send({
                content: f,
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle(a)
                    .setDescription(b)
                    .setColor(c)
                    .setFooter({ text: d })
                ]
            });
        } else {
            interaction.guild.channels.cache.get(e.id).send({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle(a)
                    .setDescription(b)
                    .setColor(c)
                    .setFooter({ text: d })
                ]
            });
        }
        interaction.reply({ content: "✅ | Embed mandado con exito!", ephemeral: true });



    }

}