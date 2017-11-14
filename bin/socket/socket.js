var gen = require('../util/serialGenerator');

function constructor(http) {
    var io = require('socket.io')(http);
    var connections = [];

    io.sockets.on('connection', function (socket) {
        connections.push(socket);

        socket.on('load', function(data){
            if(data){


            }else{

            }
        });

        socket.on('message', function(data){
            socket.broadcast.emit();
        });

        socket.on('disconnect', function(data){
            console.log('Desconectando');
            connections.slice(connections.indexOf(client), 1);
        });

    });

}

module.exports = constructor;
