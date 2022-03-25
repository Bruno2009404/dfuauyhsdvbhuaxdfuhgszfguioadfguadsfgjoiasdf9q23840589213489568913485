const Discord = require('discord.js');
const ecoSchema = require('./Schemas/economyDB');
const prefixx = require('./Schemas/prefixDB');
const Setups = require('./Schemas/setup');
const autoMod = require('./Schemas/automoderation');

module.exports = {
    getArray,
    getCustomArray,
    pagination,
    saveAll,
    msToDuration,
}

function msToDuration(ms) {
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let months = Math.floor(days / 30);
    let years = Math.floor(days / 365);
  
    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    days %= 24;
    months %= 12;
  
    years = years ? `${years} Años ` : "";
    months = months ? `${months} Meses ` : "";
    days = days ? `${days} Dias ` : "";
    hours = hours ? `${hours} Horas ` : "";
    minutes = minutes ? `${minutes} Minutos ` : "";
    seconds = seconds ? `${seconds} Segundos ` : "";
  
    return years + months + days + hours + minutes + seconds;
}

async function saveAll(guildid, userid) {
    if(guildid) {
        prefixx.findOne({ guildId: guildid }, async (err, data) => {
            if(err) throw err;
            if(!data) {
                console.log(`Asegurrado: Prefix en ${guildid}`.brightYellow)
                data = new prefixx({
                    guildId: guildid,
                })
                data.save()
            }
        })
        Setups.findOne({ guildId: guildid }, async (err, data) => {
            if(err) throw err;
            if(!data) {
                console.log(`Asegurrado: Setups en ${guildid}`.brightYellow)
                data = new Setups({
                    guildId: guildid
                })
                data.save()
            }
        })
        autoMod.findOne({ guildId: guildid }, async (err, data) => {
            if(err) throw err;
            if(!data) {
                console.log(`Asegurrado: Auto-Moderación en ${guildid}`.brightYellow)
                data = new autoMod({
                    guildId: guildid
                })
                data.save()
            }
        })
    }
    if(userid) {
        ecoSchema.findOne({ userId: userid }, async (err, data) => {
            if(err) throw err;
            if(!data) {
                console.log(`Asegurrado: Economia de ${userid}`.brightYellow)
                data = new ecoSchema({
                    userId: userid
                })
                data.save()
            }
        });
    }
    if(guildid && userid) {
        //xd
    }
}

async function pagination(client, message, options = {}) {
    if(!options.titulo) options.titulo = "✔  \`|\` Paginación";
    if(!options.texto) throw new Error("Debes poner el titulo!");
    if(!options.pages_elements) options.pages_elements = 5;
    var embeds = [];
    var dividido = options.pages_elements;
    for(let i = 0; i < options.texto.length; i += dividido) {
        let desc = options.texto.slice(i, options.pages_elements);
        options.pages_elements+= dividido;
        let embed = new Discord.MessageEmbed()
        .setTitle(options.titulo.toString())
        .setDescription(desc.join(" "))
        .setColor('#b9f4ff')
        .setThumbnail(message.guild.iconURL({dynamic: true}))
        .setTimestamp()
        embeds.push(embed)
    }
    let paginaActual = 0;
    if (embeds.length === 1) return message.reply({ embeds: [embeds[0]] }).catch(() => { });
    let boton_atras = new Discord.MessageButton().setStyle('PRIMARY').setCustomId('Atrás').setEmoji('◀').setLabel('Atrás')
    let boton_inicio = new Discord.MessageButton().setStyle('DANGER').setCustomId('Inicio').setEmoji('🏠').setLabel('Inicio')
    let boton_avanzar = new Discord.MessageButton().setStyle('PRIMARY').setCustomId('Avanzar').setEmoji('▶').setLabel('Avanzar')
    let embedpaginas = await message.channel.send({
        content: `🛎 | Haz click en los __Botones__ para cambiar de páginas`,
        embeds: [embeds[0].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })],
        components: [new Discord.MessageActionRow().addComponents([boton_atras, boton_inicio, boton_avanzar])]
    });
    const collector = embedpaginas.createMessageComponentCollector({ filter: i => i?.isButton() && i?.user && i?.user.id == message.author.id && i?.message.author.id == client.user.id, time: 180e3 });
    collector.on("collect", async b => {
        if (b?.user.id !== message.author.id) return b?.reply({ content: `❌ | Solo la persona que escribio el comando puede cambiar de pagina!` });

        switch (b?.customId) {
            case "Atrás": {
                collector.resetTimer();
                if (paginaActual !== 0) {
                    paginaActual -= 1
                    await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                    await b?.deferUpdate();
                } else {
                    paginaActual = embeds.length - 1
                    await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                    await b?.deferUpdate();
                }
            }
                break;

            case "Inicio": {
                collector.resetTimer();
                paginaActual = 0;
                await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                await b?.deferUpdate();
            }
                break;

            case "Avanzar": {
                collector.resetTimer();
                if (paginaActual < embeds.length - 1) {
                    paginaActual++
                    await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                    await b?.deferUpdate();
                } else {
                    paginaActual = 0
                    await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
                    await b?.deferUpdate();
                }
            }
                break;

            default:
                break;
        }
    });
    collector.on("end", () => {
        embedpaginas.components[0].components.map(boton => boton.disabled = true)
        embedpaginas.edit({ content: `❌ | El tiempo ha expirado!`, embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch(() => { });
    });
}

function getArray(array, delimiter) {
    newArray = ""
    for (var i = 0; i < array.length; i++) {
        newArray = newArray+array[i]+delimiter
    }; newArray = newArray.substring(0, (newArray.length-1))
    return newArray;
}

function getCustomArray(array, delimiter, increment, count, start) {
    newArray = ""
    for (var i = start; i < count; i+=increment) {
        newArray = newArray+array[i]+delimiter
    }; newArray = newArray.substring(0, (newArray.length-1))
    return newArray;
}