var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('newMessage', function(message){
    $('#messages').append(`
        <li>
            <b>${message.from}:</b> ${message.text}
        </li>
    `);
    console.log('New message: ', message);
});

socket.on('newLocationMessage', function(message){
    $('#messages').append(`
        <li>
            <b>${message.from}:</b> <a target="_blank" href="${message.url}">My current location</a>
        </li>
    `);
    console.log('New message: ', message);
});


$('#message-form').on('submit', function(e){
    e.preventDefault();

    var $messageInput = $('input[name=message]');
    var message = $messageInput.val();

    if(message){
        socket.emit('createMessage', {
            from: 'User',
            text: message,
        }, function (data){

            $messageInput.val('');
            //$('#messages').append('<li>'+message+'</li>');
            console.log('Got it');
            console.log('data: ', data);
        });

    }
});


var $locationButton = $('#send-location');

$locationButton.on('click', function(e){
    if (!navigator.geolocation){
        return alert('Geolocation not supported by you browser');
    }


    navigator.geolocation.getCurrentPosition(function(position){

        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
        });

    }, function(err){
        alert('Unable to fetch location');
    });

});