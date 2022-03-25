const Discord = require('discord.js');
const bruno = require('../../Functions');
const afkSchema = require('../../Schemas/afkSchema');
const prefixx = require('../../Schemas/prefixDB');
const config = require('../../config.json');
const ms = require('ms');
const Timeout = new Discord.Collection();

module.exports = {
    name: "messageCreate",
    async execute(client, message) {
        
        //-|-!------------------------(Que el comando sea utilizado en un servidor)------------------------|-|-//
        if(message.author.bot || !message.channel || !message.guild ) return;
        //-|-!------------------------(guardando datos)------------------------|-|-//
        await bruno.saveAll(message.guild.id, message.author.id)
        //-|-!------------------------(Prefix)------------------------|-|-//
        let data = await prefixx.findOne({ guildId: message.guild.id });
        let prefix = data.prefix;
        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)}|${escapeRegex("ciro")})\\s*`);
        if(!prefixRegex.test(message.content)) return;
        const [matchedPrefix] = message.content.match(prefixRegex);
        //-|-!------------------------(guardando datos del Enmap)------------------------|-|-//
        client.setups.ensure(message.guild.id, { welcomeChannel: "", goodbyeChannel: "" });
        client.db.ensure(message.guild.id, { WelcomeMessage: "", WelcomeBackground: "", WelcomeName: "", WelcomeImageMessage1: "", WelcomeImageMessage2: "", GoodbyeMessage: "", GoodbyeBackground: "", GoodbyeName: "", GoodbyeImageMessage1: "", GoodbyeImageMessage2: "" });
        //-|-!------------------------(Sistema AFK)------------------------|-|-//
        const checkafk = await afkSchema.findOne({ guildId: message.guild.id, userId: message.author.id })
        if(checkafk) { checkafk.delete(); return message.reply(`😊 | *Regresaste* <@${message.author.id}>, tu estado **AFK** fue removido!\nAusente desde <t:${Math.round(checkafk.date / 1000)}:R>`).then((message) => { setTimeout(() => { message.delete() }, 10000) }) }
        if(message.mentions.users.first()) {
            const data = await afkSchema.findOne({ guildId: message.guild.id, userId: message.mentions.users.first().id });
            if(data) { return message.reply(`👥 | El usuario <@${message.mentions.users.first().id}> se encuentra AFK en estos momentos...\nRazon: ${data.razon}\nAusente desde <t:${Math.round(data.date / 1000)}:R>`).then((message) => { setTimeout(() => { message.delete() }, 10000) }) }
        }
        //-|-!------------------------(Bot responde al ping)------------------------|-|-//
        if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){
            return message.reply({ embeds: [ new Discord.MessageEmbed().setDescription(`😀 \`|\` ¡Hola <@${message.author.id}>!, mi prefix es: \`c.\` pero en este servidor esta configurado como: \`${prefix}\``).setColor('BLUE') ] })
        }
        //-|-!------------------------(General)------------------------|-|-//
        let usuario = message.mentions.members.first() || message.member;
        const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        let cmd = client.commands.get(command) || client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
        //-|-!------------------------(Permisos Handler)------------------------|-|-//
        if(cmd) {
            //-|-!------------------------(Permisos (Miembro))------------------------|-|-//
            if(!message.member.permissions.has(cmd.userPerms || [])) { const permiso = cmd.userPerms.map((permiso) => `\`${permiso.replace(/CREATE_INSTANT_INVITE/, "CREAR_INVITACIÓN").replace(/KICK_MEMBERS/, "EXPULSAR_MIEMBROS").replace(/BAN_MEMBERS/, "BANEAR_MIEMBROS").replace(/ADMINISTRATOR/, "ADMINISTRADOR").replace(/MANAGE_CHANNELS/, "GESTIONAR_CANALES").replace(/MANAGE_GUILD/, "GESTIONAR_SERVIDOR").replace(/ADD_REACTIONS/, "AÑADIR_REACCIONES").replace(/VIEW_AUDIT_LOG/, "VER_EL_REGISTRO_DE_AUDITORÍA").replace(/PRIORITY_SPEAKER/, "PRIODIDAD_DE_HABLAR").replace(/STREAM/, "TRANSMITIR").replace(/VIEW_CHANNEL/, "VER_CANALES").replace(/SEND_MESSAGES/, "ENVIAR_MENSAJES").replace(/SEND_TTS_MESSAGES/, "ENVIAR_MENSAJES_DE_TEXTO_DE_VOZ").replace(/MANAGE_MESSAGES/, "GESTIONAR_MENSAJES").replace(/EMBED_LINKS/, "INSERTAR_ENLACES").replace(/ATTACH_FILES/, "ADJUNTAR_ARCHIVOS").replace(/READ_MESSAGE_HISTORY/, "lEER_EL_HISTORIAL_DE_MENSAJES").replace(/MENTION_EVERYONE/, "MENCIONAR_@EVERYONE_@HERE_Y_TODOS_LOS_ROLES").replace(/USE_EXTERNAL_EMOJIS/, "USAR_EMOJIS_EXTERNOS").replace(/VIEW_GUILD_INSIGHTS/, "VER_EMBLEMAS_DEL_SERVIDOR").replace(/CONNECT/, "CONECTAR").replace(/SPEAK/, "HABLAR").replace(/MUTE_MEMBERS/, "SILENCIAR_MIEMBROS").replace(/DEAFEN_MEMBERS/, "ENSORDECER_MIEMBROS").replace(/MOVE_MEMBERS/, "MOVER_MIEMBROS").replace(/USE_VAD/, "USAR_ACTIVIDAD_DE_VOZ").replace(/CHANGE_NICKNAME/, "CAMBIAR_APODO").replace(/MANAGE_ROLES/, "GESTIONAR_ROLES").replace(/MANAGE_WEBHOOKS/, "GESTIONAR_WEBHOOKS").replace(/MANAGE_EMOJIS_AND_STICKERS/, "GESTIONAR_EMOJIS_Y_PEGATINAS").replace(/USE_APPLICATION_COMMANDS/, "USAR_COMANDOS_DE_APLICACIONES").replace(/REQUEST_TO_SPEAK/, "SOLICITAR_HABLAR").replace(/MANAGE_THREADS/, "GESTIONAR_HILOS").replace(/CREATE_PUBLIC_THREADS/, "CREAR_HILOS_PÚBLICOS").replace(/CREATE_PRIVATE_THREADS/, "CREAR_HILOS_PRIVADOS").replace(/USE_EXTERNAL_STICKERS/, "USAR_PEGATINAS_EXTERNAS").replace(/SEND_MESSAGES_IN_THREADS/, "ENVIAR_MENSAJES_EN_LOS_HILOS").replace(/START_EMBEDDED_ACTIVITIES/, "USAR_ACTIVIDAD_DE_VOZ")}\``).join(", "); return message.reply({ embeds: [ new Discord.MessageEmbed().setTitle('❌ \`|\` Error').setDescription(`❌ \`|\` No tienes permisos para ejecutar este comando, necesitas el permiso \`${permiso}\`!`).setColor('RED').setTimestamp() ] }).then((message) => { setTimeout(() => { message.delete() }, 10000)}) }
            //-|-!------------------------(Permisos (Bot))------------------------|-|-//
            if(!message.guild.me.permissions.has(cmd.botPerms || [])) { const permiso = cmd.botPerms.map((permiso) => `\`${permiso.replace(/CREATE_INSTANT_INVITE/, "CREAR_INVITACIÓN").replace(/KICK_MEMBERS/, "EXPULSAR_MIEMBROS").replace(/BAN_MEMBERS/, "BANEAR_MIEMBROS").replace(/ADMINISTRATOR/, "ADMINISTRADOR").replace(/MANAGE_CHANNELS/, "GESTIONAR_CANALES").replace(/MANAGE_GUILD/, "GESTIONAR_SERVIDOR").replace(/ADD_REACTIONS/, "AÑADIR_REACCIONES").replace(/VIEW_AUDIT_LOG/, "VER_EL_REGISTRO_DE_AUDITORÍA").replace(/PRIORITY_SPEAKER/, "PRIODIDAD_DE_HABLAR").replace(/STREAM/, "TRANSMITIR").replace(/VIEW_CHANNEL/, "VER_CANALES").replace(/SEND_MESSAGES/, "ENVIAR_MENSAJES").replace(/SEND_TTS_MESSAGES/, "ENVIAR_MENSAJES_DE_TEXTO_DE_VOZ").replace(/MANAGE_MESSAGES/, "GESTIONAR_MENSAJES").replace(/EMBED_LINKS/, "INSERTAR_ENLACES").replace(/ATTACH_FILES/, "ADJUNTAR_ARCHIVOS").replace(/READ_MESSAGE_HISTORY/, "lEER_EL_HISTORIAL_DE_MENSAJES").replace(/MENTION_EVERYONE/, "MENCIONAR_@EVERYONE_@HERE_Y_TODOS_LOS_ROLES").replace(/USE_EXTERNAL_EMOJIS/, "USAR_EMOJIS_EXTERNOS").replace(/VIEW_GUILD_INSIGHTS/, "VER_EMBLEMAS_DEL_SERVIDOR").replace(/CONNECT/, "CONECTAR").replace(/SPEAK/, "HABLAR").replace(/MUTE_MEMBERS/, "SILENCIAR_MIEMBROS").replace(/DEAFEN_MEMBERS/, "ENSORDECER_MIEMBROS").replace(/MOVE_MEMBERS/, "MOVER_MIEMBROS").replace(/USE_VAD/, "USAR_ACTIVIDAD_DE_VOZ").replace(/CHANGE_NICKNAME/, "CAMBIAR_APODO").replace(/MANAGE_ROLES/, "GESTIONAR_ROLES").replace(/MANAGE_WEBHOOKS/, "GESTIONAR_WEBHOOKS").replace(/MANAGE_EMOJIS_AND_STICKERS/, "GESTIONAR_EMOJIS_Y_PEGATINAS").replace(/USE_APPLICATION_COMMANDS/, "USAR_COMANDOS_DE_APLICACIONES").replace(/REQUEST_TO_SPEAK/, "SOLICITAR_HABLAR").replace(/MANAGE_THREADS/, "GESTIONAR_HILOS").replace(/CREATE_PUBLIC_THREADS/, "CREAR_HILOS_PÚBLICOS").replace(/CREATE_PRIVATE_THREADS/, "CREAR_HILOS_PRIVADOS").replace(/USE_EXTERNAL_STICKERS/, "USAR_PEGATINAS_EXTERNAS").replace(/SEND_MESSAGES_IN_THREADS/, "ENVIAR_MENSAJES_EN_LOS_HILOS").replace(/START_EMBEDDED_ACTIVITIES/, "USAR_ACTIVIDAD_DE_VOZ")}\``).join(", "); return message.reply({ embeds: [ new Discord.MessageEmbed().setTitle('❌ \`|\` Error').setDescription(`❌ \`|\` No tengo permisos para ejecutar este comando, necesito el permiso \`${permiso}\`!`).setColor('RED').setTimestamp() ] }).then((message) => { setTimeout(() => { message.delete() }, 10000)}) }
        }
        //-|-!------------------------(Sistemas para el comando)------------------------|-|-//
        if(cmd){
            //-|-!------------------------(Descripción)------------------------|-|-//
            if(cmd.desc) { args.join(" ") }
            //-|-!------------------------(Uso)------------------------|-|-//
            if(cmd.usage) { args.join(" ") }
            //-|-!------------------------(Dueño)------------------------|-|-//
            if(cmd.owner) { if(!config.ownerID.includes(message.author.id)) { return message.reply({ embeds: [ new Discord.MessageEmbed().setTitle('❌ \`|\` Comando no encontrado').setDescription(`❌ \`|\` Lo siento pero el comando "**${command}**" no existe o lo escribiste mal.\n\n> Utiliza mi comando \`${prefix}help\` para ver todos mis comandos.`).setColor('RED').setTimestamp() ] }).then((message) => { setTimeout(() => { message.delete() }, 10000) }) } }
            //-|-!------------------------(Tiempo)------------------------|-|-//
            if(cmd.cooldown) { if(Timeout.has(`${cmd.name}${message.author.id}`)) return message.reply({ embeds: [ new Discord.MessageEmbed().setTitle('❌ \`|\` Error').setDescription(`❌ \`|\` Lo siento pero estas en cooldown, espera \`${ms(Timeout.get(`${cmd.name}${message.author.id}`) - Date.now(), {long: false})}\` para usar este comando!`).setColor('RED').setTimestamp() ] }).then((message) => { setTimeout(() => { message.delete() }, 10000) })
                try {
                    cmd.execute(client, message, args, prefix)
                } catch(e) {
                    message.reply({ embeds: [ new Discord.MessageEmbed().setTitle('❌ `|` Error').setDescription('❌ `|` Se produjo un error al ejecutar este comando!').setColor('RED').setTimestamp() ] })
                    console.log(e)
                }
                Timeout.set(`${cmd.name}${message.author.id}`, Date.now() + cmd.cooldown); setTimeout(() => { Timeout.delete(`${cmd.name}${message.author.id}`) }, cmd.cooldown)
            } else if(cmd.cooldown === null) {
                try {
                    cmd.execute(client, message, args, prefix)
                } catch(e) {
                    message.reply({ embeds: [ new Discord.MessageEmbed().setTitle('❌ `|` Error').setDescription('❌ `|` Se produjo un error al ejecutar este comando!').setColor('RED').setTimestamp() ] })
                    console.log(e)
                }
            }
        } else {
            //-|-!------------------------(Si no encuentra el comando)------------------------|-|-//
            if(message.content === prefix) return;
            message.reply({ embeds: [ new Discord.MessageEmbed().setTitle('❌ \`|\` Comando no encontrado').setDescription(`❌ \`|\` Lo siento pero el comando "**${command}**" no existe o lo escribiste mal.\n\n> Utiliza mi comando \`${prefix}help\` para ver todos mis comandos.`).setColor('RED').setTimestamp() ] }).then((message) => { setTimeout(() => { message.delete() }, 10000) })
        }
        
    }

}