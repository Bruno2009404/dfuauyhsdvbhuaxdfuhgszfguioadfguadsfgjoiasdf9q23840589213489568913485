const Discord = require('discord.js');
const fietu = require('fietu');
const db = require('megadb');
const goodbye = new db.crearDB('goodbye');

module.exports = {
    name: "guildMemberRemove",
    async execute(client, member) {
        
        //-|-!------------------------(buscamos el data)------------------------|-|-//
        const data = goodbye.get(`GoodbyeChannel-${member.guild.id}`)
        //-|-!------------------------(Si HAY data)------------------------|-|-//
        if(data) {
            //-|-!------------------------(Obtenemos las cosas guardadas)------------------------|-|-//
            const background = goodbye.get(`GoodbyeBackground-${member.guild.id}`)
            const mensaje = goodbye.get(`GoodbyeMessage-${member.guild.id}`);
            const namebase = goodbye.get(`GoodbyeName-${member.guild.id}`);
            const st = goodbye.get(`GoodbyeImageMessage1-${member.guild.id}`);
            const tt = goodbye.get(`GoodbyeImageMessage2-${member.guild.id}`);
            const name = namebase.replace(/username/, member.user.username).replace(/usertag/, member.user.tag);
            const secondtext = st.replace(/{server}/, member.guild.name).replace(/{userid}/, member.user.id).replace(/{membercount}/, member.guild.memberCount).replace(/{username}/, member.user.username).replace(/{usertag}/, member.user.tag);
            const thirdtext = tt.replace(/{server}/, member.guild.name).replace(/{userid}/, member.user.id).replace(/{membercount}/, member.guild.memberCount).replace(/{username}/, member.user.username).replace(/{usertag}/, member.user.tag);
            const msg = mensaje.replace(/{user}/, `<@${member.user.id}>`).replace(/{server}/, member.guild.name).replace(/{userid}/, member.user.id).replace(/{membercount}/, member.guild.memberCount).replace(/{username}/, member.user.username).replace(/{usertag}/, member.user.tag);
            //-|-!------------------------(Creamos las bienvenidas)------------------------|-|-//
            const goodbye = await new fietu.welcome()
            .setBackground(background, "BACKGROUND")
            .setAvatar(member.user.displayAvatarURL({ format: `png` }))
            .setFirstText(name)
            .setSecondText(secondtext)
            .setThirdText(thirdtext)
            .welcome()
            //-|-!------------------------(Exportamos la bienvenida a una foto)------------------------|-|-//
            const attachment = new Discord.MessageAttachment(goodbye, `welcome.png`)
            //-|-!------------------------(Mandamos las bienvenidas)------------------------|-|-//
            client.channels.cache.get(data).send({ content: msg, files: [attachment] })
        } else {
            //-|-!------------------------(Si NO hay datos, return)------------------------|-|-//
            return;
        }
        
    }

}