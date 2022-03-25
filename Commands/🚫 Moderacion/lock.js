const Discord = require('discord.js');

module.exports = {
    name: 'lock',
    alias: [],
    desc: "Bloquea un canal en tu servidor",
    usage: "lock",
    userPerms: ["ADMINISTRATOR", "MANAGE_GUILD"],
    botPerms: ["MANAGE_GUILD"],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const everyone = message.guild.roles.cache.find(r => r.name === "@everyone")

        message.channel.permissionOverwrites.edit(everyone, { SEND_MESSAGES: false})
        
        await message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle("✅ \`|\` Canal bloqueado")
                .setDescription(`✔ \`|\` ${message.channel} a sido bloqueado!`)
                .setColor("#ffffff")
                .setThumbnail(message.guild.iconURL())
                .setTimestamp()
                .setFooter({ text: `Codigo hecho por \"Tojar#4519\"`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
            ]
        })

    }

}