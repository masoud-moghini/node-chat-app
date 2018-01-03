const path = require('path');
const express = require ('express');
const http =require('http');
const socketIO = require('socket.io');
const message= require('./utils/message')
const PORT =process.env.PORT || 3000;
const {isRealString} = require('./utils/validation')
const app=express();
const server = http.createServer(app);
const io = socketIO(server);
var publicPath = path.join(__dirname,'/../public');
app.use(express.static(publicPath));


io.on('connection',(socket)=>{
    console.log('connection set up');
    socket.on('disconnect',(socket)=>{
        console.log('disconnected by client');
    });

    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name)||!isRealString(params.room))
        {
            callback('name and room name are required')
        }
        callback();


        socket.join(params.room);
        socket.emit('newMessage',message.generateMessage('Thanks for joining us','admin'));
        socket.broadcast.to(params.room).emit('NewMember',message.generateMessage(`${params.name} joined us`,'admin'));
    
    })
    
    socket.on('createLocationMessage',(location)=>{
        socket.broadcast.emit('newLocationMessage',message.generateLocationMessage('Masoud',location.latitude,location.longitude))
    })
    socket.on('createMessage',function (data,callback){
        console.log(data);
        socket.broadcast.emit('newMessage',{
            from:data.from,
            text:data.text
        });
        callback();
    })
})



server.listen(PORT,()=>console.log(publicPath));

