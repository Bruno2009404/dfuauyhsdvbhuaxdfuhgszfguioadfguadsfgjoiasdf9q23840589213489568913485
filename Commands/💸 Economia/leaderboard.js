const Discord = require('discord.js');
const ecoSchema = require('../../Schemas/economyDB');
const bruno = require('../../Functions');
var medallas = {
    1: "🥇",
    2: "🥈",
    3: "🥉",
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
            (miembro, index) => `${medallas[index+1] ?? "⚪"} \`${index+1}\` - <@${miembro.userId}>\n💵 \`|\` Dinero: \`${miembro.dinero}\`\n💰 \`|\` Banco: \`${miembro.banco}\`\n\n`
        )
        bruno.pagination(client, message, {
            titulo: `💰 \`|\` Tabla`,
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