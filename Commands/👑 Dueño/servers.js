const Discord = require('discord.js');
const bruno = require('../../Functions');

module.exports = {
    name: 'servers',
    alias: [],
    userPerms: [],
    botPerms: [],
    cooldown: null,
    owner: true,

    async execute(client, message, args, prefix){

        const srv = client.guilds.cache;
        const server = srv.map(
            (g) => `|================================|\nNombre: **__${g.name}__**\nId: **__${g.id}__**\n\n`
        );
        bruno.pagination(client, message, {
            titulo: `📡 \`|\` Servidores donde estoy :D`,
            texto: server,
            pages_elements: 3
        })

    }

}