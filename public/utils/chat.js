var socket = io('http://localhost:3000');


function scrollToBottom() {
    // Elements
    var message=jQuery('#messages');
    var newMessage = message.children('li:last-child')

    //Heights
    var scrollHeight=message.prop('scrollHeight');
    var scrollTop=message.prop('scrollTop');
    var clientHeight=message.prop('clientHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    
    if(scrollHeight<= scrollTop+clientHeight+newMessageHeight+lastMessageHeight){
        message.scrollTop(scrollHeight);
    }
    
}




socket.on('connect',()=>{
    var params = jQuery.deparam(window.location.search);
    socket.emit('join',params,(err)=>{
        if(err){
            alert(err)
            window.location.href="/"
        }else{
            console.log('no error message');
        }
    });
});

socket.on('disconnect',()=>{
    console.log('disconnected from server');
});


socket.on('GreetingMessage',(message)=>{
    console.log(message);
})


socket.on('NewMember',(message)=>{
    console.log(message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: in ${moment(message.createdAt).format('h : m a')} ${message.text}`);
    jQuery('#messages').append(li);
    scrollToBottom();
})


socket.on('newMessage',(data)=>{
    console.log(data);
    var template = jQuery('#template-message').html();
    var html = Mustache.render(template,{
        text:data.text,
        from:data.from,
        createdAt:moment(data.createdAt).format('h : m a')
    });


    jQuery('#messages').append(html);
    // var li = jQuery('<li></li>');
    // li.text(`${data.from}: in ${moment(data.createdAt).format('h : m a')}  ${data.text}`);
    // jQuery('#messages').append(li);
    scrollToBottom();
});

socket.on('newLocationMessage',(data)=>{
    // console.log('new location message');
    // var li =jQuery('<li></li>');
    // var a = jQuery('<a target=_blank>See My Location</a>');

    // li.text(`${data.from} at ${moment(data.createdAt).format('h:mm a')}`);
    // a.attr('href',data.url);
    // li.append(a);

    var template =jQuery('#location-template-message').html();
    var html = Mustache.render(template,{
        from:data.from,
        createdAt:moment(data.createdAt).format('h:mm a'),
        url:data.url
    });
    jQuery('#messages').append(html);
    
})

$('#message-form').on('submit',(e)=>{
    e.preventDefault();
    console.log('create message');
    socket.emit('createMessage',{
        from:'user',
        text:$('[name=message]').val()
    },()=>{
        //callback function in order to acknowledge
        console.log('must be emptified');
        jQuery('[name=message').val('');
    })
})

var locationButton=$('#get-location');
locationButton.on('click',()=>{
    if(!navigator.geolocation){
        alert("geolocation is not supported in your browser");
    }

    else{
        locationButton.attr('disabled','disabled').text('sending location ...');
        navigator.geolocation.getCurrentPosition((position)=>{
            socket.emit('createLocationMessage',{
                latitude:position.coords.latitude,
                longitude:position.coords.longitude
            }
            ,()=>   {
                }
            )
            locationButton.removeAttr('disabled').text('send location');
        ()=>{
            locationButton.removeAttr('disabled').text('send location');
            alert('unable to get location');            
        }
    }
)
}})