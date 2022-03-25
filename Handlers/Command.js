const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const Ascii = require('ascii-table');

module.exports = async (client) => {

    const Table = new Ascii('Commands Loaded!');

    CommandsArray = [];

    (await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        client.commands.set(command.name, command);
        CommandsArray.push(command);

        Table.setHeading(`Name`, `Status`);
        await Table.addRow(command.name, "✅ Success")
    })

    console.log(`${Table.toString()}`.red);

}