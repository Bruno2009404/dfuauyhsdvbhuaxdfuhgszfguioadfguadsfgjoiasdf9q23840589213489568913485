const { Schema, model } = require('mongoose')

const prefix = new Schema({
    guildId: {
        type: String,
        required: true
    },
    prefix: {
        type: String,
        default: "c."
    },
},
    {
        collection: 'Prefix'
    }
)

module.exports = model('PrefixSchema', prefix)