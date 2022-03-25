const { Events } = require('../Validation/EventName');
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');

module.exports = async (client) => {

    const Table = new Ascii("Events Loaded!");

    (await PG(`${process.cwd()}/Events/*/*.js`)).map(async (file) => {
        const event = require(file);

        if(!Events.includes(event.name) || !event.name) {
            const L = file.split("/");
            await Table.addRow(`${event.name || "MISSING"}`, `⛔ El nombre del evento es invalido o perdido: ${L[6] + `/` + L[7]}`);
            return;
        }

        if(event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args));
        } else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        };

        Table.setHeading(`Name`, `Status`);
        await Table.addRow(event.name, `✅ Success`)
    })

    console.log(`${Table.toString()}`.brightRed)

}