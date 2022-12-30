const mongoose = require('mongoose')

const ChatSchema = mongoose.Schema({
    members: {
        type: Array,
    },

}, { timestamps: true });

const chat = mongoose.model('chat', ChatSchema)

module.exports = chat