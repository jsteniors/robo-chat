var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/robo_db');



module.exports = {Mongoose: mongoose};
