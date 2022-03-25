const Discord = require("discord.js");
const intents = new Discord.Intents();
const client = new Discord.Client({
    restTimeOffset: 0,
    shards: 'auto',
    intents: 32767,
    partials: ["MESSAGE", "CHANNEL", "GUILD_MEMBER", "GUILD_SCHEDULED_EVENT", "REACTION", "USER"],
    allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: false },
});
const moment = require("moment");
require('colors');
require("dotenv").config();
require('moment-duration-format');
const Enmap = require('enmap');
const config = require(`./config.json`);
//-----------------------------------------(Extra)-----------------------------------------//
client.owner = config.ownerName;
client.mod = config.moderatorName;
client.version = config.vercion;
client.memory = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
client.duration = moment.duration(client.uptime).format(" D [dias], H [hrs], m [mins], s [segs]");
client.backupDB = new Enmap({
    dataDir: `./DB/backups`,
    name: "backups",
})
client.setups = new Enmap({
    dataDir: `./DB/database`,
    name: "database",
})
client.db = new Enmap({
    dataDir: `./DB/enmap-database`,
    name: "enmap-database",
})
//-----------------------------------------(Handler)-----------------------------------------//
//(Permisos)//
client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();
const fs = require('fs');
//(Handlers Handler)//
const command = fs.readdirSync(`./Handlers`);
command.forEach(handler => {
    require(`./Handlers/${handler}`)(client);
})
//-----------------------------------------(Forever Online)-----------------------------------------//
process.on('unhandledRejection', function (error) {
    console.log(error);
});
process.on('uncaughtException', function (error) {
    console.log(error);
});
process.on('uncaughtExceptionMonitor', function (error) {
    console.log(error);
});
process.on('multipleResolves', function (error) {
    console.log(error);
});
client.on('shardError', function (error) {
    console.log(error)
});
//-----------------------------------------(Token)-----------------------------------------//
client.login(process.env.TOKEN).catch(() => console.log(`-[X]- NO HAS ESPECIFICADO UN TOKEN VALIDO -[X]-`.red));