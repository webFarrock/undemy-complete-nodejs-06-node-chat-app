var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('newMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = $('#message-template').html();

    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime,
    });
    $('#messages').append(html);
});

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = $('#location-message-template').html();

    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime,
    });

    $('#messages').append(html);

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
        });

    }
});


var $locationButton = $('#send-location');

$locationButton.on('click', function(e){
    if (!navigator.geolocation){
        return alert('Geolocation not supported by you browser');
    }

    var $this = $(this);

    $this.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position){

        socket.emit('createLocationMessage', {
            from: "User",
            lat: position.coords.latitude,
            lon: position.coords.longitude,
        }, function(){
            $this.removeAttr('disabled').text('Send location');
        });

    }, function(err){
        $this.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });

});