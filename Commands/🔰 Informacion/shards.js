const Discord = require('discord.js');
const bruno = require('../../Functions');

module.exports = {
    name: 'shards',
    alias: [],
    desc: "Muestra todos los shards del bot",
    usage: "shards",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const promises = await client.shard.broadcastEval(`[this.shard.ids[0], this.guilds.cache.size, this.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0), this.channels.cache.size]`);
        let finale = "";
        promises.forEach((value) => {
            finale += `👾 \`|\` Shard [${value[0]}]:\nS: **${value[1].toLocaleString()}** | U: **${value[2].toLocaleString()}** | C: **${value[3].toLocaleString()}**`
        })
        bruno.pagination(client, message, {
            titulo: `💎 \`|\` Shards de __${client.user.tag}__`,
            texto: finale,
            pages_elements: 3
        })

    }

}