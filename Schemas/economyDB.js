const { Schema, model } = require('mongoose')

const economyD = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    dinero: {
        type: Number,
        default: 10
    },
    banco: {
        type: Number,
        default: 0
    },
},
    {
        collection: 'Economy'
    }
)

module.exports = model('economy', economyD)