const Discord = require('discord.js');
require('dotenv').config();
const mongoose = require('mongoose');
const Ascii = require('ascii-table');

module.exports = {
  name: "ready",
  async execute(client) {

    //-|-!------------------------(Creamos Tablas)------------------------|-|-//
    const Table1 = new Ascii(`Logged In!`)
    const Table2 = new Ascii(`MongoDB!`)
        
    //-|-!------------------------(Crea estados para la presencia del bot)------------------------|-|-//
    const Estado = [
      `${client.guilds.cache.size} servidores`,
      "Moderador: alwes#4585",
      "Creado el 7/2/2022",
      "c.info | c.botinfo",
      "Nerfeen al minero",
      "c.help"
    ];
    //-|-!------------------------(Creamos la presencia)------------------------|-|-//
    setInterval(() => {
      setTimeout(() => {
        client.user.setPresence({
          activities: [{ name: Estado[Math.floor(Math.random() * Estado.length)] }],
          status: 'online',
          type: "WATCHING"
        });
      }, 30000);
    }, 10000)
    //-|-!------------------------(conectamos el bot a MongoDB)------------------------|-|-//
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(async () => {
      await Table2.addRow(`✅`, `Conectado a la base de datos de MongoDB!`)
      console.log(`${Table2.toString()}`.blue)
      return;
    }).catch(async (error) => {
      await Table2.addRow(`⛔`, `Hubo un error para conectarse a MongoDB...!`)
      await Table2.addRow(`❌`, `${error}`)
      console.log(`${Table2.toString()}`.red)
      return;
    })
    //-|-!------------------------(Avisa cuando el bot esta listo)------------------------|-|-//
    await Table1.addRow(`👍`, `Perfectamente logeado como ${client.user.tag}`)
    console.log(`${Table1.toString()}`.green)
        
  }

}