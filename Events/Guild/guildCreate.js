const Discord = require('discord.js');

module.exports = {
    name: "guildCreate",
    async execute(client, guild, message) {
        
        //-|-!------------------------(buscamos el canal por donde mandara el mensaje)------------------------|-|-//
        let defaultChannel = "";
        guild.channels.cache.forEach((channel) => {
            if(channel.type == 'GUILD_TEXT' && defaultChannel == '') {
                defaultChannel = channel;
            }
        })
        //-|-!------------------------(hacemos el embed)------------------------|-|-//
        const embed = new Discord.MessageEmbed()
        .setTitle('😀 \`|\` Gracias por invitarme')
        .setDescription(`🤗 \`|\` Muchas gracias por invitarme\n👍 \`|\` Para ver mis comandos pon \`c.help\`, espero te guste este bot, y aqui abajo te dejo un poco de mi información.`)
        .setFields(
            { name: '¿Para que fui creado?', value: `😀 \`|\` Fui creado para ayudar a las personas y divertirlas, soy un bot muy configurable y también ayudo a la gente con mis comandos de \`Moderación\`.` },
            { name: '¿Por que soy español?', value: `🤔 \`|\` Pues soy un bot español ya que mi creador habla español, si hablas ingles o algo asi, solamente puedes traducir!` },
            { name: '¿Quién es mi creador?', value: `🤝 \`|\` Mi creador es: \`${client.owner}\`.` },
        )
        .setFooter({ text: "Espero ser de mucho agrado 🤗 (PD: El mensaje se borrara después de 1 hora)" })
        .setColor('AQUA')
        .setTimestamp()
        //-|-!------------------------(mandamos el embed)------------------------|-|-//
        defaultChannel.send({ embeds: [embed] }).then((message) => {
            setTimeout(() => {
                message.delete()
            }, 3600000)
        })
        
    }

}