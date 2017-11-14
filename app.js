var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var http = require('http').Server(express);
var socketRooms = require('./bin/www').socketRooms;
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

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



app.get('/socketRooms',function (req, res) {
    res.send(socketRooms);
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
