const Discord = require('discord.js');
const ecoSchema = require('../../Schemas/economyDB');
const bruno = require('../../Functions');
var medallas = {
    1: "š„",
    2: "š„",
    3: "š„",
}

module.exports = {
    name: 'leaderboard',
    alias: ["lb"],
    desc: "Muestra una tabla con la persona mas millonaria del servidor",
    usage: "leaderboard",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        let data = await ecoSchema.findOne({ userId: message.author.id });
        if(!data) {
            data = new ecoSchema({
                userId: message.author.id
            })
            data.save()
        }
        const total = await ecoSchema.find();
        await message.guild.members.fetch();
        const ordenado = total.filter(data => message.guild.members.cache.get(data.userId)).sort((a, b) => Number((b.dinero+b.banco) - (a.dinero+a.banco)));
        const texto = ordenado.map(
            (miembro, index) => `${medallas[index+1] ?? "āŖ"} \`${index+1}\` - <@${miembro.userId}>\nšµ \`|\` Dinero: \`${miembro.dinero}\`\nš° \`|\` Banco: \`${miembro.banco}\`\n\n`
        )
        bruno.pagination(client, message, {
            titulo: `š° \`|\` Tabla`,
            texto: texto
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