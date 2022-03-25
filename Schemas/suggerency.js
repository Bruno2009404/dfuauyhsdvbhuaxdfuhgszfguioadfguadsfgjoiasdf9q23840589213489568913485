const { Schema, model } = require('mongoose');

const sugerency = new Schema({
    messageId: {
        type: String,
        required: true
    },
    si: {
        type: Array,
        default: []
    },
    no: {
        type: Array,
        default: []
    },
    autor: {
        type: String,
        default: ""
    },
},
    {
        collection: 'Suggestions'
    }
)

module.exports = model('SuggerencySystem', sugerency);