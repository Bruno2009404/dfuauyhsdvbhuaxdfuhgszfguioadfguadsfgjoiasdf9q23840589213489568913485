const Discord = require('discord.js');

module.exports = {
    name: 'unlockall',
    alias: [],
    desc: "Desbloquea todos los canales del servidor!",
    usage: "",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        try {
            message.guild.channels.cache.forEach(channel => {
                if(channel.type === "GUILD_TEXT") {
                    channel.permissionOverwrites.edit(message.guild.id, {SEND_MESSAGES: true}).catch(e => console.log(e));
                    channel.send(`🔓 | Este canal ha sido desbloqueado por \`${message.author.tag}\`!`)
                }
            });
            message.reply(`✅ | He desbloqueado cada canal del servidor! (Si hay canales que no estan desbloqueados es que estoy tardando desblqueandolos o no tengo permisos necesarios)\n\n> **Código por ☼•ϻadex501☼#0501**.`)
        } catch (e) {
            console.log(e)
        }

    }

}