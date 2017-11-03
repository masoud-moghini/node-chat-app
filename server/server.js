const path = require('path');
const express = require ('express');
const http =require('http');
const socketIO = require('socket.io');
const PORT =process.env.PORT || 3000;

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

    socket.on('createMessage',(data)=>{
        console.log(data);
        socket.emit('newMessage',{
            from:data.from,
            text:data.text
        })
    })
})



server.listen(PORT,()=>console.log(publicPath));

