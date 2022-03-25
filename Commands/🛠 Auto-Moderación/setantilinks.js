const Discord = require('discord.js');
const autoMod = require('../../Schemas/automoderation');

module.exports = {
    name: 'setantilinks',
    alias: ["set-anti-links", "sal"],
    desc: "Establece un sistema de anti-links para tu servidor",
    usage: "setantilinks",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        let data = await autoMod.findOne({ guildId: message.guild.id });
        let trueorfalse;
        let mensaje;
        if(data.antilinks === false) {
            trueorfalse = true;
        } else {
            trueorfalse = false;
        }
        await autoMod.findOneAndUpdate({ guildId: message.guild.id }, {
            antilinks: trueorfalse
        })
        message.reply(`✅ | He **__${data.antilinks ? 'DESACTIVADO' : 'ACTIVADO'}__** el sistema de anti-links con exito!`)

    }

}