const { Schema, model } = require('mongoose')

const AFK = new Schema({
    guildId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    razon: {
        type: String,
        default: 'Sin razon'
    },
    date: {
        type: String,
        required: true
    }
},
    {
        collection: 'Afk'
    }
)

module.exports = model('AfkSystem', AFK)