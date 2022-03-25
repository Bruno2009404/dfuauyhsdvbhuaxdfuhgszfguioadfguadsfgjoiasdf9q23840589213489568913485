const autoMod = require('../Schemas/automoderation');

module.exports = async (client) => {

    client.on('messageCreate', async (message) => {
        try {
            if(message.author.bot) return;
            let automod_data = await autoMod.findOne({ guildId: message.guild.id });
            if(automod_data.antilinks === true) {
                let antilinkregex = /((([(https)(http)]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
                if (antilinkregex.test(message) === true) {
                    await message.delete().catch((e) => {});
                    message.channel.send(`😥 | ${message.author} Por favor, no mandes Links!`);
                }
            }
        } catch(e) {
            console.log(e)
        }
    })

}