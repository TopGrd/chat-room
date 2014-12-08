/**
 * Created with IntelliJ IDEA.
 * Creator: LeeZhuo
 * Date: 2014/12/8
 * Time: 18:11
 */
var io = require('socket.io')();
var names = [];
io.sockets.on('connection',function(socket){
    socket.emit('welcome',{text:'欢迎您.'});
    socket.on('name',function(data,callback){
        if(names.indexOf(data)!=-1){
            callback(false);
        }else{
            callback(true);
            names.push(data);
            socket.name = data;
            console.log('names:\t'+names);
            io.sockets.emit('names',names);
        }

    });

    socket.on('user message', function (data) {
        io.sockets.emit('user message',{
            name:socket.name,
            message:data
        })
    });

    socket.on('disconnect',function(){
        if(!socket.name) return;
        if(names.indexOf(socket.name)>-1){
            names.splice(names.indexOf(socket.name),1);
        }
        console.log('names:\t'+names);
        io.sockets.emit('names',names);
    });
});




exports.listen = function (_server) {
    return io.listen(_server);
};