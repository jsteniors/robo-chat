var Message = require('../model/messageModel').Message;

this.insert = function (message) {
    return new Message(message).save();
}


this.listAll = function () {
    return Message.find();
}

this.listByParam = function (param) {
    return Message.find(param);
}


