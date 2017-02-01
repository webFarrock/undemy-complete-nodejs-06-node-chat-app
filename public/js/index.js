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