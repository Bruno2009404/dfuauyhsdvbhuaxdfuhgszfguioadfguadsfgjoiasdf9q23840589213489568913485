const { Schema, model } = require('mongoose')

const snipe = new Schema({
    channelId: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    author: {
        type: String
    },
    time: {
        type: Number
    },
    image: {
        type: String
    },
    mention: {
        type: String
    }
},
    {
        collection: 'Snipe'
    }
)

module.exports = model('snipeSchema', snipe)