const mongoose = require('mongoose');

const Message = new mongoose.Schema({
        title: { type: String },
        content: { type: String },
        sent: { type: Date }
    }
);

module.exports = mongoose.model('messages', Message);
