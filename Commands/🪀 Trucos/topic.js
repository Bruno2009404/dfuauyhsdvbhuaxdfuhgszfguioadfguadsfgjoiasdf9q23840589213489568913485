const Discord = require('discord.js');

module.exports = {
    name: 'topic',
    alias: [],
    desc: "Muestra un tema para hablar si el chat esta muerto",
    usage: "topic",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        let respuestas = [
            "¿Cuánto tiempo pasas en las redes sociales?",
            "¿Tienes que tener siempre el último teléfono?",
            "¿Quién es tu artista favorito (cómico, músico, actor, etc...)?",
            "¿Qué es lo más loco y escandaloso que quieres conseguir?",
            "¿Te gusta la comida picante?",
            "¿Qué es lo más picante que has comido?",
            "¿Qué deportes te gusta practicar?",
            "¿Cuál es el restaurante más elegante en el que has comido?",
            "Si pudieras llamar a cualquier persona del mundo y mantener una conversación de una hora, ¿a quién llamarías?",
            "¿Cuál es tu estación favorita?",
            "¿Cuál crees que será el próximo gran avance tecnológico?",
            "¿Tienen las películas el mismo poder que los libros para cambiar el mundo?",
            "¿Quién es la persona más interesante que sigues?",
            "¿Qué noticia reciente es la más interesante?",
            "¿Cuál es el peor restaurante en el que has comido?",
            "¿Cuál es el restaurante temático más extraño del que has oído hablar?",
            "¿Cuál es el peor hotel en el que has estado?",
            "¿Cuál es el mejor hotel en el que has estado?",
            "¿Qué haces para librarte del estrés?",
            "¿Qué haces en tus tiempos libres?",
            "¿Qué es lo que mas deseas en el mundo?",
            "¿Cuál crees que sería la lengua más difícil de aprender?",
            "¿Qué idioma sabes hablar?",
            "¿Qué tendencias seguías cuando eras más joven?",
            "¿Crees que todo el revuelo sobre la privacidad está justificado?",
            "¿Cuál es el viaje en avión más largo que has hecho?",
            "¿Cuál es tu videojuego favorito?",
            "¿Qué opinas de los buffets?",
            "¿Haces algún deporte?",
            "¿Cuántos amigos tienes?",
            "¿Prefieres tener a un bot como amigos?",
            "¿Tienes abuelos vivos?",
            "¿Te gusta el anime?",
            "¿Qué tecnología emergente te entusiasma más?",
            "¿Qué libro te ha influido más?",
            "¿Quién es alguien popular ahora que te gusta mucho?",
            "¿Quién tuvo el mayor impacto en la persona en la que te has convertido?",
            "¿Cuánto dinero tienes en mis comandos de Economía?",
            "¿Qué te gusta hacer?",
            "¿Cuál es tu hobby?",
            "¿En que trabajas?",
            "¿Eres mayor de edad?",
            "¿Cuánto tiempo llevas en Discord?",
            "¿Qué es lo que mas amas de tu familia?",
            "¿Cuál es tu pelicula favorita?",
            "¿Cuál es tu color favorito?",
            "¿Prefieres que siempre tengas buena suerte pero que siempre ganes la loteria, o que tengas la mejor suerte pero que nunca ganes la loteria?",
            "¿Prefieres el dinero o tu familia?",
            "¿Cuántos dias llevas en casa sin salir ni una vez?",
            "¿Te gusta la cuarentena?",
        ]
        let random = respuestas[Math.floor(Math.random() * respuestas.length)];
        message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('🥠 \`|\` Tema')
                .setDescription(`🤔 \`|\` ${random}`)
                .setColor('RANDOM')
                .setTimestamp()
            ]
        })

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