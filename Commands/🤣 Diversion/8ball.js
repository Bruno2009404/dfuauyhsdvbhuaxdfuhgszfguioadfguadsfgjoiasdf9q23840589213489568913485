const Discord = require('discord.js');

module.exports = {
    name: '8ball',
    alias: [],
    desc: "La bola decidira por ti",
    usage: "8ball <&pregunta>",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const pregunta = args.join(" ")
        if(!pregunta) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription(`❌ \`|\` Escribe tu pregunta!`)
                .setColor('RED')
                .setTimestamp()
            ]
        })

        let respuestas = [
            "Si",
            "No",
            "Probablemente",
            "Probablemente si",
            "Probablemente no",
            "Puedes confiar en ello",
            "Por supuesto que no!",
            "Por supuesto que si!",
            "Tal vez",
            "No cuentes con eso",
            "Sin duda",
            "Dudoso",
            "Quizás",
            "No lo se",
            "Obvio",
            "Obvio que no!",
            "Obvio que si!",
            "La verdad, no se",
            "Mejor pregunta otra cosa...",
            "Buenas pregunta...",
            "No se a que contestarte a eso",
            "Es correcto",
            "Es incorrecto"
        ]
        let random = respuestas[Math.floor(Math.random() * respuestas.length)];

        const embed = new Discord.MessageEmbed()
        .setTitle('🎱 \`|\` 8Ball')
        .setDescription(`❓ \`|\` A tu pregunta:\n**${pregunta}**\n\n🎱 \`|\` Mi respuesta es:\n**${random}**`)
        .setColor('RANDOM')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        message.reply({ embeds: [embed], allowedMentions: { reliedUser: false } })

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