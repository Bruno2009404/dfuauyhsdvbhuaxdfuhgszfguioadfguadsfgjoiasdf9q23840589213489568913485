const Discord = require('discord.js');
const isgd = require('isgd');

module.exports = {
    name: 'shorturl',
    alias: [],
    desc: "Hace la url que quieras pequeña",
    usage: "shorturl <%url-original> <%url-personalizado>",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const url = args[0];
        const customUrl = args[1];

        try {
            if(!url) {
                return message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle('❌ `|` Error')
                        .setDescription('❌ `|` Debes decir una url!')
                        .setColor('RED')
                        .setTimestamp()
                    ]
                })
            } else if(!customUrl) {
                return message.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle('❌ `|` Error')
                        .setDescription('❌ `|` Debes decirme como quieres que se corte el url!')
                        .setColor('RED')
                        .setTimestamp()
                    ]
                })
            } else {
                isgd.custom(url, customUrl, (res) => {//a traducirlo papu//si quere borralo y hacelo vos solo te doy una idea de como hacer que se entienda en español
                    if(res === "Error: Short URLs may only contain the characters a-z, 0-9 and underscore)"){
                        message.reply(`❌ | Recuerda que los url deben contenter caracteres de a-z, 0-9 y caracteres especiales!`)
                    }
                    if(res.startsWith('Error:')) {
                        return message.reply({
                            embeds: [
                                new Discord.MessageEmbed()
                                .setTitle('❌ `|` Error')
                                .setDescription('❌ `|` Hubo un error... Puedes intentarlo de vuelta?')
                                .addField(`⛔ Error`, `${res}`, true)
                                .setColor('RED')
                                .setTimestamp()
                            ]
                        })
                    } else {
                        message.reply(`🛠 | La URL se ha cortado como:\n${res}`)
                        return;
                    }
                })
            }
        } catch(e) {
            console.log(e)
        }

    }

}