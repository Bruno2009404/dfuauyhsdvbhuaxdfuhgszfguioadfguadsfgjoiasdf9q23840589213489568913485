const Discord = require('discord.js');
const setupSchema = require('../Schemas/setup');
const votosSchema = require('../Schemas/suggerency');
const prefixx = require('../Schemas/prefixDB');
const bruno = require('../Functions');

module.exports = async (client) => {

    client.on('messageCreate', async (message) => {
        try {
            let data = await prefixx.findOne({ guildId: message.guild.id });
            if(!message.channel || !message.guild || message.author.bot) return;
            const setup_data = await setupSchema.findOne({ guildId: message.guild.id });
            if(!setup_data || !setup_data.sugerencySystem || !message.guild.channels.cache.get(setup_data.sugerencySystem) || message.channel.id !== setup_data.sugerencySystem) return;
            message.delete().catch(() => {});
            let prefix = data.prefix;
            let botones = new Discord.MessageActionRow().addComponents([
                new Discord.MessageButton().setStyle("SECONDARY").setLabel("0").setEmoji("✅").setCustomId("votar_si"),
                new Discord.MessageButton().setStyle("SECONDARY").setLabel("0").setEmoji("❌").setCustomId("votar_no"),
                new Discord.MessageButton().setStyle("PRIMARY").setLabel("¿Quién ha votado?").setEmoji("❓").setCustomId("ver_votos")
            ])
            let mensaje;
            if(message.content) {
                mensaje = `>>> ${message.content}`
            } else {
                mensaje = "**__SIN MENSAJE__**"
            }
            let embed = new Discord.MessageEmbed()
            .setAuthor({ name: `Sugerencia de ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(mensaje)
            .addField(`👍 Likes`, `\`\`\`0 Votos\`\`\``, true)
            .addField(`👎 Dislikes`, `\`\`\`0 Votos\`\`\``, true)
            .setColor('YELLOW')
            .setFooter({ text: `Quieres enviar una sugerencia? Envíala en este canal o pon \"${prefix}sugerency\"!`, iconURL: `https://images.emojiterra.com/google/android-pie/512px/1f4a1.png` })
            .setTimestamp()
            if(message.attachments.first()) embed.setImage(message.attachments.first().url)
            let msg = await message.channel.send({ embeds: [embed], components: [botones] })
            let data_msg = new votosSchema({
                messageId: msg.id,
                autor: message.author.id
            });
            data_msg.save();
        } catch(e) { console.log(e) }
    })
    client.on('interactionCreate', async (interaction) => {
        try {
            if (!interaction.guild || !interaction.channel || !interaction.message || !interaction.user) return; bruno.saveAll(interaction.guild.id, interaction.user.id); let setup_data = await setupSchema.findOne({ guildId: interaction.guild.id }); let msg_data = await votosSchema.findOne({ messageId: interaction.message.id }); if (!msg_data || !setup_data || !setup_data.sugerencySystem || interaction.channelId !== setup_data.sugerencySystem) return;
            switch (interaction.customId) {
                case "votar_si": {
                    if (msg_data.si.includes(interaction.user.id)) return interaction.reply({ content: `❌ | Ya has votado __SÍ__ en la sugerencia de <@${msg_data.autor}>`, ephemeral: true });
                    if (msg_data.no.includes(interaction.user.id)) msg_data.no.splice(msg_data.no.indexOf(interaction.user.id), 1)
                    msg_data.si.push(interaction.user.id);
                    msg_data.save();
    
                    interaction.message.embeds[0].fields[0].value = `\`\`\`${msg_data.si.length} Votos\`\`\``;
                    interaction.message.embeds[0].fields[1].value = `\`\`\`${msg_data.no.length} Votos\`\`\``;
    
                    interaction.message.components[0].components[0].label = msg_data.si.length.toString();
                    interaction.message.components[0].components[1].label = msg_data.no.length.toString();
    
                    await interaction.message.edit({ embeds: [interaction.message.embeds[0]], components: [interaction.message.components[0]] });
                    interaction.deferUpdate();
                }
                    break;
    
                case "votar_no": {
                    if (msg_data.no.includes(interaction.user.id)) return interaction.reply({ content: `❌ | Ya has votado __NO__ en la sugerencia de <@${msg_data.autor}>`, ephemeral: true });
                    if (msg_data.si.includes(interaction.user.id)) msg_data.si.splice(msg_data.si.indexOf(interaction.user.id), 1)
                    msg_data.no.push(interaction.user.id);
                    msg_data.save();
    
                    interaction.message.embeds[0].fields[0].value = `\`\`\`${msg_data.si.length} Votos\`\`\``;
                    interaction.message.embeds[0].fields[1].value = `\`\`\`${msg_data.no.length} Votos\`\`\``;
    
                    interaction.message.components[0].components[0].label = msg_data.si.length.toString();
                    interaction.message.components[0].components[1].label = msg_data.no.length.toString();
    
                    await interaction.message.edit({ embeds: [interaction.message.embeds[0]], components: [interaction.message.components[0]] });
                    interaction.deferUpdate();
    
                }
                    break;
                    
                case "ver_votos": {
                    interaction.reply({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setTitle(`🤝 \`|\` Votos de la sugerencia`)
                            .setDescription(`📋 \`|\` Estos son los votos de la sugerencia de <@${msg_data.autor}>`)
                            .addField(`👍 Likes`, msg_data.si.length >= 1 ? msg_data.si.map(u => `<@${u}>\n`).toString() : "Desafortunadamente no hay votos...", true)
                            .addField(`👎 Dislikes`, msg_data.no.length >= 1 ? msg_data.no.map(u => `<@${u}>\n`).toString() : "Desafortunadamente no hay votos...", true)
                            .setColor('BLURPLE')
                        ],
                        ephemeral: true
                    })
                }
                    break;
    
                default:
                    break;
            }
        } catch (e) { console.log(e) }
    })

}