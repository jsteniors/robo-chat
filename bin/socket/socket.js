var gen = require('../util/serialGenerator');
var mdao = require('../dao/messageDAO');
var udao = require('../dao/userDAO');

var connections = [];
var rooms = [];

function constructor(http) {
    var io = require('socket.io')(http);

    io.sockets.on('connection', function (socket) {

        connections.push(socket);
        var chatId = null;
        socket.on('load', function(data){
            var message = {
                chatId: chatId,
                type: 'message',
                time: new Date().getTime()
            };

            if(data){
                console.log('logado');
                chatId = data;
                message.chatId = chatId;
                var ret = {
                    chatId: chatId,
                    boolean: true
                };
                //mdao.listByParamDefault('startChat', socket, {chatId: chatId});
                mdao.listByParam({chatId: chatId}).then(msgs=>{
                    ret.messages = msgs;
                    socket.emit('startChat', ret);
                });
            }else{
                console.log('nao logado');
                chatId = gen.generate(12);
                var user = {
                  chatId: chatId,
                  lastAccess: new Date().getTime()
                };

                udao.insert(user);

                message.chatId = chatId;
                var content = 'Bem vindo';
                message.content = content;
                message.user = 'Super M';
                var newRoom = {
                    chatId: chatId,
                    messages: [message],
                    boolean: true,
                    user: 'Super M'
                };
                rooms[chatId] = newRoom;
                //mdao.insertShow(message, 'startChat', socket, newRoom);
                mdao.insert(message).then( (msg)=> {
                    newRoom.messages = [msg];
                    socket.emit('startChat', newRoom);
                });
            }
            socket.join(chatId);

        });

        socket.on('message', function(data){
            var message = {
                chatId: chatId,
                type: 'message',
                time: new Date().getTime(),
                content: 'Resposta para: '+data.content,
                user: 'Super M'
            };
            console.log('enviando pra geral');
            rooms[chatId].messages.push(data);
            rooms[chatId].messages.push(message);
            mdao.insert(data).then(m=>socket.broadcast.to(chatId).emit('receive', m));

            mdao.insert(message).then(m=>io.in(chatId).emit('receive', m));
        });

        socket.on('disconnect', function(data){
            console.log('Desconectando');
            connections.slice(connections.indexOf(socket), 1);
        });

    });

}

module.exports = {connect: constructor, rooms:rooms};
