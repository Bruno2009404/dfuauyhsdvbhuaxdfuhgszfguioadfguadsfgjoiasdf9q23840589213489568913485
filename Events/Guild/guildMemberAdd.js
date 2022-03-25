const Discord = require('discord.js');
const fietu = require('fietu');
const db = require('megadb');
const welcome = new db.crearDB('welcome');

module.exports = {
    name: "guildMemberAdd",
    async execute(client, member) {
        
        //-|-!------------------------(buscamos el data)------------------------|-|-//
        const data = welcome.get(`WelcomeChannel-${member.guild.id}`)
        //-|-!------------------------(Si HAY data)------------------------|-|-//
        if(data) {
            //-|-!------------------------(Ob``tenemos las cosas guardadas)------------------------|-|-//
            const background = welcome.get(`WelcomeBackground-${member.guild.id}`)
            const mensaje = welcome.get(`WelcomeMessage-${member.guild.id}`);
            const namebase = welcome.get(`WelcomeName-${member.guild.id}`);
            const st = welcome.get(`WelcomeImageMessage1-${member.guild.id}`);
            const tt = welcome.get(`WelcomeImageMessage2-${member.guild.id}`);
            const name = namebase.replace(/username/, member.user.username).replace(/usertag/, member.user.tag);
            const secondtext = st.replace(/{server}/, member.guild.name).replace(/{userid}/, member.user.id).replace(/{membercount}/, member.guild.memberCount).replace(/{username}/, member.user.username).replace(/{usertag}/, member.user.tag);
            const thirdtext = tt.replace(/{server}/, member.guild.name).replace(/{userid}/, member.user.id).replace(/{membercount}/, member.guild.memberCount).replace(/{username}/, member.user.username).replace(/{usertag}/, member.user.tag);
            const msg = mensaje.replace(/{user}/, `<@${member.user.id}>`).replace(/{server}/, member.guild.name).replace(/{userid}/, member.user.id).replace(/{membercount}/, member.guild.memberCount).replace(/{username}/, member.user.username).replace(/{usertag}/, member.user.tag);
            //-|-!------------------------(Creamos la bienvenidas)------------------------|-|-//
            const welcome = await new fietu.welcome()
            .setBackground(background, "BACKGROUND")
            .setAvatar(member.user.displayAvatarURL({ format: `png` }))
            .setFirstText(name)
            .setSecondText(secondtext)
            .setThirdText(thirdtext)
            .welcome()
            //-|-!------------------------(Exportamos la bienvenida a una foto)------------------------|-|-//
            const attachment = new Discord.MessageAttachment(welcome, `welcome.png`)
            //-|-!------------------------(mandamos las bienvenidas)------------------------|-|-//
            client.channels.cache.get(data).send({ content: msg, files: [attachment] })
        } else {
            //-|-!------------------------(Si NO hay data, return)------------------------|-|-//
            return;
        }
        
    }

}