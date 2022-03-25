const { Schema, model } = require('mongoose');

const schema = new Schema({
    guildId: {
        type: String,
        required: true
    },
    antilinks: {
        type: Boolean,
        default: false
    },
},
    {
        collection: 'AutoModeration'
    }
)

module.exports = model('Schema', schema);