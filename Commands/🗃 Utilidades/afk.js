const Discord = require('discord.js');
const afkSchema = require('../../Schemas/afkSchema');

module.exports = {
    name: 'afk',
    alias: [],
    desc: "Te pones en estado en AFK",
    usage: "afk [%razon]",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const reason = args.join(' ') || "Sin razon";

        const data = await afkSchema.findOne({ guildId: message.guild.id });
        if(!data) {
            const datasave = new afkSchema({
                guildId: message.guild.id,
                userId: message.author.id,
                razon: reason,
                date: Date.now()
            })
            datasave.save()
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                    .setTitle('💤 \`|\` AFK Establecido')
                    .setDescription(`👤 \`|\` <@${message.author.id}>, ahora estas AFK!\n**Razon**: ${reason}`)
                    .setFooter({ text: `Avisaré a los que te mencionen!` })
                    .setColor('BLUE')
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                ]
            })
        } else {
            afkSchema.findOneAndDelete({
                guildId: message.guild.id,
                userId: message.author.id
            });
            return message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setDescription('❌ | Ya estas en AFK, pero como hablaste te lo removere!')
                    .setColor('RED')
                ]
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