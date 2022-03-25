const Discord = require('discord.js');

module.exports = {
    name: 'lockall',
    alias: [],
    desc: "Bloquea todos los canales del servidor",
    usage: "lockall",
    userPerms: ["ADMINISTRATOR", "MANAGE_GUILD"],
    botPerms: ["MANAGE_GUILD"],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        try {
            message.guild.channels.cache.forEach(channel => {
                if(channel.type === "GUILD_TEXT") {
                    channel.permissionOverwrites.edit(message.guild.id, {SEND_MESSAGES: false}).catch(e => console.log(e));
                    channel.send(`🔐 | Este canal ha sido bloqueado por \`${message.author.tag}\`!`)
                }
            });
            message.reply(`✅ | He bloqueado cada canal del servidor! (Si hay canales que no estan bloqueados es que estoy tardando blqueandolos o no tengo permisos necesarios)\n\n> **Código por ☼•ϻadex501☼#0501**.`)
        } catch (e) {
            console.log(e)
        }

    }

}