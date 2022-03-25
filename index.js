const { ShardingManager } = require('discord.js');
require('dotenv').config();
const TOKEN = process.env.TOKEN;

const manager = new ShardingManager('./bot.js', {
    token: TOKEN,
    totalShards: 'auto',
});

manager.on('shardCreate', shard => {
    console.log(`🚀 | Iniciando la Shard: ${shard.id}`)
});

manager.spawn();