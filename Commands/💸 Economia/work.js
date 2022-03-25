const Discord = require('discord.js');
const ecoSchema = require('../../Schemas/economyDB');

module.exports = {
    name: 'work',
    alias: [],
    desc: "Trabajas para ganar mas dinero",
    usage: "work",
    userPerms: [],
    botPerms: [],
    cooldown: 60000 * 60,
    owner: false,

    async execute(client, message, args, prefix){

        let data = await ecoSchema.findOne({ userId: message.author.id });
        if(!data) {
            data = new ecoSchema({
                userId: message.author.id
            })
            data.save()
        }
        let works = [
            "Carpintero",
            "Lechero",
            "Frutero",
            "Cerrajero",
            "Cocinero",
            "Deshollinador",
            "Mecánico",
            "Lavandero",
            "Artesano",
            "Pescador",
            "Escultor",
            "Tornero",
            "Albañil",
            "Editor",
            "Barrendero",
            "Fontanero/Plomero",
            "Obrero",
            "Panadero",
            "Carpintero",
            "Locutor",
            "Barbero",
            "Soldador",
            "Escritor",
            "Leñador",
            "Pintor",
            "Vendedor",
            "Peletero",
            "Sastre",
            "Repartidor",
            "Impresor",
            "Pastor",
            "Cajero",
            "Policía",
            "Agricultor",
            "Vigilante",
            "Exterminador",
            "Carnicero",
            "Animador",
            "Peluquero",
            "Chofer/Conductor",
            "Abogado",
            "Médico",
            "Paleontólogo",
            "Ingeniero",
            "Historiador",
            "Geógrafo",
            "Biólogo",
            "Filólogo",
            "Psicólogo",
            "Matemático",
            "Arquitecto",
            "Computista",
            "Profesor",
            "Periodista",
            "Botánico",
            "Físico",
            "Sociólogo",
            "Farmacólogo",
            "Químico",
            "Politólogo",
            "Enfermero",
            "Electricista",
            "Bibliotecólogo",
            "Paramédico",
            "Técnico",
            "Archivólogo",
            "Músico",
            "Filósofo",
            "Secretaria",
            "Traductor",
            "Antropólogo",
            "Técnico",
            "Economista",
            "Administrador",
            "Lingüista",
            "Radiólogo",
            "Contador",
            "Psicoanalista",
            "Ecólogo",
            "Arqueólogo",
            "Doctor"
        ]
        let trabajo = works[Math.floor(Math.random() * works.length)];
        let dineroo = Math.floor(Math.random() * 1000)
        await ecoSchema.findOneAndUpdate({ userId: message.author.id }, {
            $inc: {
                dinero: dineroo
            }
        })
        message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setAuthor({ name: `${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
                .setDescription(`👷‍♂️ \`|\` Has trabajado de *${trabajo}* y ganaste \`$${dineroo}\`!`)
                .setColor('GREEN')
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