const Discord = require('discord.js');
const snipe = require('../../Schemas/snipeSchema');

module.exports = {
    name: "messageDelete",
    async execute(client, message) {
        
        //-|-!------------------------(Buscamos datos)------------------------|-|-//
        let data = await snipe.findOne({ channelId: message.channel.id })
        //-|-!------------------------(Si NO hay datos)------------------------|-|-//
        if(!data){
            //-|-!------------------------(Creamos nuevo snipe)------------------------|-|-//
            let newdata = new snipe({
                channelId: message.channel.id,
                content: message.content,
                author: message.author,
                time: Math.floor(Date.now() / 1000),
                image: message.attachments.first() ? message.attachments.first().url : null,
                mention: message.mentions.members.first() ? message.mentions.members.first().user.id : null
            })
            //-|-!------------------------(Guardamos el snipe)------------------------|-|-//
            return await newdata.save()

        }
        //-|-!------------------------(Si hay datos, editamos el snipe)------------------------|-|-//
        await snipe.findOneAndUpdate({
            channelId: message.channel.id,
            content: message.content,
            author: message.author,
            time: Math.floor(Date.now() / 1000),
            image: message.attachments.first() ? message.attachments.first().url : null,
            mention: message.mentions.members.first() ? message.mentions.members.first().user.id : null
        })
        
    }

}