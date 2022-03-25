const { Schema, model } = require('mongoose');

const setups = new Schema({
    guildId: {
        type: String,
        required: true
    },
    reactionRole: {
        type: Array
    },
    ticketSystem: {
        type: Object,
        default: {
            canal: "",
            mensaje: ""
        }
    },
    sugerencySystem: {
        type: String,
        default: ""
    },
},
    {
        collection: 'Setups'
    }
)

module.exports = model('SetupSystem', setups);