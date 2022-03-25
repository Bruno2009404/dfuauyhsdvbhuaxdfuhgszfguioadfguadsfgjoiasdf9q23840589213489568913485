const Discord = require('discord.js');

module.exports = {
    name: 'rolememberinfo',
    alias: ["roleindexinfo", "rmi", "rii"],
    desc: "Muestra todos los miembros con ese rol",
    usage: "",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){

        if (args.includes("@everyone")) return;
        
        if (args.includes("@here")) return;

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!role) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` Debes mencionar un rol!')
                .setColor('RED')
                .setTimestamp()
            ]
        })

        let membersWithRole = message.guild.members.cache.filter(member => {
            return member.roles.cache.find(r => r.name === role.name);
        }).map(member => {
            return member.user.tag;
        })
        if (membersWithRole === '0') return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` Nadie tiene ese rol!')
                .setColor('RED')
                .setTimestamp()
            ]
        })

        if (membersWithRole > 2048) return message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setTitle('❌ `|` Error')
                .setDescription('❌ `|` La lista es muy larga!')
                .setColor('RED')
                .setTimestamp()
            ]
        })

        let roleEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle('🔘 \`|\` Información del rol')
            .setThumbnail(message.guild.iconURL())
            .setDescription(`👥 \`|\` Miembros con el rol **${role.name}**.`)
            .addField('👦 Miembros', `__${membersWithRole.join("\n")}__`)
            .setTimestamp()
        message.reply({ embeds: [roleEmbed] });

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