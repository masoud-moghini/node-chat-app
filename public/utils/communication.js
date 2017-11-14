var socket = io('http://localhost:3000');
socket.on('connect',()=>{
    console.log('connected to a server socket');
});

socket.on('disconnect',()=>{
    console.log('disconnected from server');
});


socket.on('GreetingMessage',(message)=>{
    console.log(message);
})


socket.on('NewMember',(message)=>{
    console.log(message);
})
socket.on('newMessage',(data)=>{
    console.log(data);
    var li = jQuery('<li></li>');
    li.text(`${data.from}: ${data.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMessage',(data)=>{
    console.log('new location message');
    var li =jQuery('<li></li>');
    var a = jQuery('<a target=_blank>See My Location</a>');

    li.text(`${data.from}`);
    a.attr('href',data.url);
    li.append(a);
    jQuery('#messages').append(li);
    
})

$('#message-form').on('submit',(e)=>{
    e.preventDefault();
    socket.emit('createMessage',{
        from:'user',
        text:$('[name=message]').val()
    },()=>{
        //callback function in order to acknowledge
    })
})

var locationButton=$('#get-location');
locationButton.on('click',()=>{
    if(!navigator.geolocation){
        alert("geolocation is not supported in your browser");
    }
    else{
        navigator.geolocation.getCurrentPosition((position)=>{
            socket.emit('createLocationMessage',{
                latitude:position.coords.latitude,
                longitude:position.coords.longitude
            }
        )
    }
)
}})