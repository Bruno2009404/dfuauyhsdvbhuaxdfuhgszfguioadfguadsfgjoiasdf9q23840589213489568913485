const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');

module.exports = async (client) => {

    const Table = new Ascii('SC Loaded!');

    CommandsArray = [];

    (await PG(`${process.cwd()}/Slash/*/*.js`)).map(async (file) => {
        const slash = require(file);

        client.slashCommands.set(slash.data.name, slash);
        CommandsArray.push(slash);

        Table.setHeading(`Name`, `Status`);
        await Table.addRow(slash.data.name, "✅ Success")
    })

    console.log(`${Table.toString()}`.yellow);

}