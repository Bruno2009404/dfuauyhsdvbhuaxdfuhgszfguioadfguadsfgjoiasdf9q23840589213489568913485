const Discord = require('discord.js');
const setupSchema = require('../../Schemas/setup');

module.exports = {
    name: 'disablesugerency',
    alias: ["disablesug", "disablesuggestion"],
    desc: "Desabilita el canal de sugerencias",
    usage: "disablesugerency",
    userPerms: ["ADMINISTRATOR"],
    botPerms: ["MANAGE_GUILD"],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        const setup_data = await setupSchema.findOne({ guildId: message.guild.id });
        if(!setup_data || !setup_data.sugerencySystem) {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription('❌ `|` No tienes canal de sugerencias establecidas!')
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
        } else {
            await setupSchema.findOneAndDelete({ guildId: message.guild.id }, {
                sugerencySystem: setup_data.sugerencySystem
            });
            const embed = new Discord.MessageEmbed()
            .setTitle(`:gear: \`|\` Sugerencias`)
            .setColor('#FF457D')
            .setDescription(`✅ \`|\` El canal de sugerencias fue desabilitada!`)
            .setTimestamp()
            message.reply({
                embeds: [embed]
            })
        }

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