/**
 * Created with IntelliJ IDEA.
 * Creator: LeeZhuo
 * Date: 2014/12/7
 * Time: 20:57
 */
var http = require('http'),
    fs = require('fs'),
    count = 0;
var server = http.createServer(function (req, res) {
    fs.readFile('./index.html',function(err,data){
        if(err){
            throw err;
        }
        res.writeHead(200,{
            'Content-Type':'text/html'
        });
        res.end(data,'utf8');
    });
});
server.listen(3000);
console.log('app start!');
var io = require('socket.io').listen(server);
io.sockets.on('connection',function(socket){
    count++;
    socket.emit('users',{number:count});
    socket.broadcast.emit('users',{number:count});
    socket.emit('message',{text:'you connect!'});
    socket.broadcast.emit('message',{text:'欢迎新用户加入'});
    console.log('User connect!');
    socket.on('message',function(data){
        socket.broadcast.emit('push message',data);
    });
    socket.on('disconnect',function(){
        count--;
        socket.broadcast.emit('users',{number:count});
        console.log('User Disconnect!');
    });
});
