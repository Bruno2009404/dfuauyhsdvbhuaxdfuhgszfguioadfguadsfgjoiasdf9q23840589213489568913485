const Discord = require('discord.js');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { readdirSync } = require('fs');
const mongoose = require('mongoose');

module.exports = {
    name: 'help',
    alias: ["h", "bothelp"],
    desc: "Mira todos los comandos del bot",
    usage: "help [%comando || %categoria]",
    userPerms: [],
    botPerms: [],
    cooldown: 1000 * 5,
    owner: false,

    async execute(client, message, args, prefix){
 
        let tiempo = {
            "1000": "1 segundo",
            "5000": "5 segundos",
            "10000": "10 segundos",
            "60000": "1 minuto",
            "3600000": "1 hora",
            "null": "No tiene cooldown",
        }
        const category = readdirSync('./Commands').filter(categoría => categoría!== "👑 Dueño");
        if(args[0]) {
            const comando = client.commands.get(args[0].toLowerCase()) || client.commands.find(c => c.alias && c.alias.includes(args[0].toLowerCase));
            const categories = category.find(categoria => categoria.toLowerCase().endsWith(args[0].toLowerCase()));
            if(args[0] === 'eval' || args[0] === 'fun' || args[0] === 'reload' || args[0] === 'restart' || args[0] === 'shell' || args[0] === 'test' || args[0] === 'setavatar' || args[0] === 'setname' || args[0] === 'servers') return message.reply({
                embeds: [
                    new MessageEmbed()
                    .setTitle('❌ `|` Error')
                    .setDescription(`❌ \`|\` No se ah encontrado el comando que has especificado!\n\n> Utiliza \`${prefix}help\` para ver los comandos y categorías`)
                    .setColor('RED')
                    .setTimestamp()
                ]
            })
            if(comando) {
                let embed = new MessageEmbed()
                .setTitle(`⚙ \`|\` Comando \`${comando.name}\``)
                .addField(`IMPORTANTE ─────────`, `**<>** - Obligatorio\n**[]** - Opcionalmente`, true)
                .addField(`EXTRA ──────────────`, `**@** - Miembro | **#** - Canal\n**%** - Texto | **$** - Servidor\n**!** - Numero | **&** - ID`, true)
                .setColor('AQUA')
                .setTimestamp()
                if(comando.desc) embed.addField('✍ Descripción', `\`\`\`${comando.desc}\`\`\``)
                if(comando.usage) embed.addField('📝 Uso', `\`\`\`${prefix}${comando.usage}\`\`\``)
                if(comando.cooldown) embed.addField('🕒 Cooldown', `\`\`\`${tiempo[comando.cooldown]} -> (${comando.cooldown} milisegundos)\`\`\``)
                if(comando.alias && comando.alias.length >= 1) embed.addField('✅ Alias', `${comando.alias.map(aliases => `\`${aliases}\``).join(', ')}`)
                if(comando.userPerms && comando.userPerms.length >= 1) embed.addField('👤 Permisos requeridos', `${comando.userPerms.map(permisos => `\`${permisos}\``).join(', ')}`)
                if(comando.botPerms && comando.botPerms.length >= 1) embed.addField('🤖 Permisos de BOT requeridos', `${comando.botPerms.map(permisos2 => `\`${permisos2}\``).join(', ')}`)
                message.reply({ embeds: [embed] })
            } else if(categories) {
                const comandos_of_category = readdirSync(`./Commands/${categories}`).filter(file => file.endsWith('.js'));
                let embed = new MessageEmbed()
                .setTitle(`🛠 \`|\` Comandos de Categoria \`${categories.split(" ")[1]}\``)
                .setDescription(comandos_of_category.length >= 1 ? `>>> ${comandos_of_category.map(comando => `\`${prefix}${comando.replace(/.js/, "")}\``).join(' - ')}` : `>>> **Todavía no hay ningún comando, espera pronto**`)
                .setTimestamp()
                .setThumbnail('https://cdn.discordapp.com/attachments/922338775730913290/946370829829165086/Help.png')
                .setColor('AQUA')
                message.reply({ embeds: [embed] })
            } else {
                return message.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle('❌ `|` Error')
                        .setDescription(`❌ \`|\` No se ha encontrado el comando que has especificado!\n\n> Utiliza \`${prefix}help\` para ver los comandos y categorías`)
                        .setColor('RED')
                        .setTimestamp()
                    ]
                })
            }
        } else {
            var paginaActual = 0;

            const ayuda_embed = new MessageEmbed()
            .setTitle(`⚙ \`|\` Ayuda de __${client.user.tag}__`)
            .addField(`💪 Mis caracteristicas`,`>>> :grinning: \`|\` ¡Hola <@${message.author.id}>!, veo que quieres ver mis comandos, pues, apreta en el Menú de abajo para poder ver todos mis comandos, seré actualizado muy seguido\n\nTengo comandos de **🤣 Diversión**, **⚙ Ajustes**, **💸 Economía**, etc...`, false)
            .addField(`❓ Como me usas?`,`>>> 💗 \`|\` Usualmente me puedes usar poniendo \`${prefix}{comando}\` y hay te respondere\n:tools: \`|\` Si quieres ayuda con un comando solamente pon \`\`\`js\n${prefix}help <comando> || ${prefix}help <categoria>\`\`\``, false)
            .addField(`📈 Estados`,`>>> :gear: **${client.commands.size} Comandos**\n:file_folder: en **${client.guilds.cache.size} Servidores**\n⌚️ **${client.duration} Uptime**\n📶 \`${client.ws.ping}ms\` **Ping**\n🔒 **${client.version} Versión**`, false)
            .setThumbnail(message.guild.iconURL({ dyniamic: true }))
            .setColor('AQUA')
            .setFooter({ text: `Página 1 / ${category.length+1}` })
            .setTimestamp()
            let embeds_pages = [ayuda_embed];

            category.map((categoria, index) => {
                const comandos_of_category = readdirSync(`./Commands/${categoria}`).filter(files => files.endsWith('.js'));

                let embed = new Discord.MessageEmbed()
                .setTitle(`🛠 \`|\` Comandos de \`${categoria.split(" ")[1]}\``)
                .setDescription(comandos_of_category.length >= 1 ? `>>> ${comandos_of_category.map(comando => `\`${prefix}${comando.replace(/.js/, "")}\``).join(' - ')}` : `>>> **Todavía no hay ningún comando, espera pronto**`)
                .setTimestamp()
                .setThumbnail('https://cdn.discordapp.com/attachments/922338775730913290/946370829829165086/Help.png')
                .setColor('AQUA')
                .setFooter({ text: `Página ${index+2} / ${category.length+1}` })
                embeds_pages.push(embed)
            })

            const seleccion = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId('1')
                .setMaxValues(5)
                .setMinValues(1)
                .setPlaceholder('Apreta aquí para ver los comandos')
                .setOptions(category.map(categoria => {
                    let objecto = {
                        label: categoria.split(" ")[1].substring(0, 50),
                        value: categoria,
                        description: `Mira los comandos de ${categoria.split(" ")[1].substring(0, 50)}`,
                        emoji: categoria.split(" ")[0],
                    }
                    return objecto;
                }))
            )

            const botones = new Discord.MessageActionRow().addComponents([
                new Discord.MessageButton().setStyle('PRIMARY').setLabel("Atrás").setCustomId("Atrás").setEmoji("◀"),
                new Discord.MessageButton().setStyle('DANGER').setLabel("Inicio").setCustomId("Inicio").setEmoji("🏠"),
                new Discord.MessageButton().setStyle('PRIMARY').setLabel("Avanzar").setCustomId("Avanzar").setEmoji("▶"),
            ])

            let mensaje_ayuda = await message.reply({ embeds: [ayuda_embed], components: [seleccion, botones] });

            const collector = mensaje_ayuda.createMessageComponentCollector({ filter: i => i.isButton() || i.isSelectMenu() && i.user && i.message.author.id == client.user.id, time: 180e3 })
        
            collector.on("collect", async (interaccion) => {
                if (interaccion.isButton()) {
                    if(interaccion.user.id !== message.author.id) return interaccion.reply({ content: `❌ | Esta no es tu interacción!`, ephemeral: true});
                    switch (interaccion.customId) {
                        case "Atrás": {
                            collector.resetTimer();
                            if (paginaActual !== 0) {
                                paginaActual -= 1
                                await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
                                await interaccion?.deferUpdate();
                            } else {
                                paginaActual = embeds_pages.length - 1
                                await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
                                await interaccion?.deferUpdate();
                            }
                        }
                            break;
    
                        case "Inicio": {
                            collector.resetTimer();
                            paginaActual = 0;
                            await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
                            await interaccion?.deferUpdate();
                        }
                            break;
    
                        case "Avanzar": {
                            collector.resetTimer();
                            if (paginaActual < embeds_pages.length - 1) {
                                paginaActual++
                                await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
                                await interaccion?.deferUpdate();
                            } else {
                                paginaActual = 0
                                await mensaje_ayuda.edit({ embeds: [embeds_pages[paginaActual]] }).catch(() => { });
                                await interaccion?.deferUpdate();
                            }
                        }
                            break;
    
                        default:
                            break;
                    }
                } else {
                    let embeds = [];
                    for(const selector of interaccion.values) {
                        const comandos_of_category = readdirSync(`./Commands/${selector}`).filter(files => files.endsWith('.js'));

                        let embed =new MessageEmbed()
                        .setTitle(`🛠 \`|\` Comandos de \`${selector.split(" ")[1]}\``)
                        .setDescription(comandos_of_category.length >= 1 ? `>>> ${comandos_of_category.map(comando => `\`${prefix}${comando.replace(/.js/, "")}\``).join(' - ')}` : `>>> **Todavía no hay ningún comando, espera pronto**`)
                        .setTimestamp()
                        .setThumbnail('https://cdn.discordapp.com/attachments/922338775730913290/946370829829165086/Help.png')
                        .setColor('AQUA')

                        embeds.push(embed)
                    }
                    interaccion.reply({ embeds, ephemeral: true })
                }
            });

            collector.on('end', async () => {
                mensaje_ayuda.edit({ content: `❌ | Tu tiempo se ha acabado, vuelve a poner \`${prefix}help\` para ver mis comandos!`, components: [] }).catch(() => {})
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