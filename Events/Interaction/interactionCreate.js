const Discord = require('discord.js');
const prefixx = require('../../Schemas/prefixDB');

module.exports = {
    name: "interactionCreate",
    async execute(client, interaction) {
        
        //-|-!------------------------(Si la interacción es un comando o context menu)------------------------|-|-//
        if (interaction.isCommand() || interaction.isContextMenu()) {
            //-|-!------------------------(Exportamos el comando)------------------------|-|-//
            const slashcmds = client.slashCommands.get(interaction.commandName);
            //-|-!------------------------(Si no hay slash commands, return)------------------------|-|-//
            if (!slashcmds) return;
            //-|-!------------------------(hacemos un try)------------------------|-|-//
            try {
                //-|-!------------------------(ejecutamos el comando)------------------------|-|-//
                await slashcmds.execute(client, interaction);
            } catch (error) {
                //-|-!------------------------(Mandamos el error en la consola)------------------------|-|-//
                interaction.reply({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setTitle('❌ `|` Error')
                        .setDescription('❌ `|` Se produjo un error al ejecutar este comando!')
                        .setColor('RED')
                        .setTimestamp()
                    ]
                })
                console.error(error);
            }
        }
        
    }

}