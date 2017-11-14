var User = require('../model/userModel').User;


this.insert = function (user) {
    return new User(user).save();
}

this.listAll = function () {
    User.find({});
}

this.listByParam = function (param) {
    User.find(param);
}

this.findByParam = function (param) {
    User.findOne(param);
}