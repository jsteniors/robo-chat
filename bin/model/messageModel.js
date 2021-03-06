var mongoose = require('../../db').Mongoose;

var schema = new mongoose.Schema({
    chatId: String,
    content: String,
    type: String,
    time: Date,
    user: String
}, {collection: 'messages'});


module.exports = {Message: mongoose.model('Message', schema)};