var mongoose = require('../../db').Mongoose;

var userSchema = new mongoose.Schema({
    chatId: String,
    email: String,
    codigoCliente: String,
    lastAccess: Date
}, {collection: 'users'});

var user = mongoose.model('User', userSchema);

module.exports = {User: user};