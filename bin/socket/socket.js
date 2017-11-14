var gen = require('../util/serialGenerator');

function constructor(http) {
    var io = require('socket.io')(http);
    var connections = [];

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
                chatId = data;
                socket.join(data);
                socket.emit('')
            }else{
                chatId = gen.generate(12);

                socket.join(chatId);

                var content = 'Bem vindo';
                message.content = content;
                socket.emit('receive', message);
            }
        });

        socket.on('message', function(data){
            var message = {
                chatId: chatId,
                type: 'message',
                time: new Date().getTime(),
                content: 'Resposta para: '+data
            };
            socket.broadcast.to(chatId).emit();
        });

        socket.on('disconnect', function(data){
            console.log('Desconectando');
            connections.slice(connections.indexOf(client), 1);
        });

    });

}

module.exports = constructor;
