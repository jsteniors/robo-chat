

app.post('/webhook', function(req, res){
    console.log('POST DO CONVERSE', data);
    var data = req.body;

    if (data.verifyString === yourverifystring) {
        if (data.action === "challenge") {
            console.log(data.payload.message.text);
            var retorno = '{"challenge": "' + data.payload.message.text + '"}';
            console.log(retorno);
            res.status(200).send(retorno);
        }
        else if (data.action === "message") {
            var mensagem = data.payload.message.text;
            var userId = data.payload.message.userId;
            var chatId = data.payload.message.threadID;

            // Envia mensagem para o cliente
            var msg = {chatid: chatId, msg: mensagem, user: 'Super M'};
            insereMensagem(mydb, msg);

            sockets.forEach(function (socket) {
                if (socket.room === chatId) {
                    socket.emit('receive', msg);
                }
            });
        }
        else if (data.action === 'onBlurEmail') {
            var idemail = data.idemail;
            var bodyB2B = getCodigoClienteTopo(idemail);
            console.log('retorno B2B', bodyB2B)
            res.status(200).send(bodyB2B);
        }
        else {
            console.log(data);
        }
        res.sendStatus(200);
    }
    else {
        console.log("Acesso negado");
        res.sendStatus(403);
    }
});