var mongoose = required('../../db').Mongoose;

var userSchema = new mongoose.Schema({
    chatId: String,
    email: String,
    codigoCliente: String,
    lastAccess: Date
}, {collection: 'users'});