const mongoose = require('mongoose');

const message = new mongoose.Schema({
    title: { type: String },
    content: { type: String }
})

module.exports = mongoose.model('messages', message);
