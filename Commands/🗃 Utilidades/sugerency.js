const Discord = require('discord.js');
const setupSchema = require('../../Schemas/setup');
const votosSchema = require('../../Schemas/suggerency');

module.exports = {
    name: 'sugerency',
    alias: ["sug", "suggestion"],
    desc: "Manda una sugerencia en el canal de sugerencia",
    usage: "sugerency <!sugerencia>",
    userPerms: [],
    botPerms: ["MANAGE_MESSAGES"],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const argumentos = args.join(" ")
        let setup_data = await setupSchema.findOne({ guildId: message.guild.id });
        if(!setup_data) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription('❌ `|` No hay un canal de sugerencias establecido!')
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
        } else {
            const sugChannel = await setupSchema.findOne({ guildId: message.guild.id });
            const channel = sugChannel.sugerencySystem;
            message.delete().catch(() => {});
            let botones = new Discord.MessageActionRow().addComponents([
                //votar si
                new Discord.MessageButton().setStyle("SECONDARY").setLabel("0").setEmoji("✅").setCustomId("votar_si"),
                //votar no
                new Discord.MessageButton().setStyle("SECONDARY").setLabel("0").setEmoji("❌").setCustomId("votar_no"),
                //ver votanes
                new Discord.MessageButton().setStyle("PRIMARY").setLabel("¿Quién ha votado?").setEmoji("❓").setCustomId("ver_votos"),
            ])
            let mensaje;
            if(message.content) {
                mensaje = `>>> ${argumentos}`
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
            let msg = await client.channels.cache.get(channel).send({ embeds: [embed], components: [botones] })
            let data_msg = new votosSchema({
                messageId: msg.id,
                autor: message.author.id
            })
            data_msg.save()
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