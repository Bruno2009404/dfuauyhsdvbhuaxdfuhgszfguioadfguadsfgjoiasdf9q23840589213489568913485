const { Schema, model } = require('mongoose')

const warnings = new Schema({
    guildId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    warnings: {
        type: Array,
        required: true
    }
},
    {
        collection: 'Warns'
    }
)

module.exports = model('warnings', warnings)