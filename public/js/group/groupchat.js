$(document).ready(function(){
    const socket = io()
    const room = $('#groupName').val()
    const sender = $('#sender').val()
    const senderEmail = $('#sender-email').val()
    socket.on('connect', function(){
        console.log('yes, user connected!')
        const params = {
            room: room,
            sender,
            email: senderEmail
        }
        socket.emit('join', params, function(){
            console.log('user has joined this channel')
        })
    })

    socket.on('getUsersList', data => {
        const ol = $('<ol></ol>')
        for(let i=0; i<data.length; i++){
            $('#receiverName').val(data[i].email);
            ol.append('<p><a id="val" data-toggle="modal" data-target="#myModal">'+data[i].fullName+'</a></p>')
        }
       
        $(document).on('click', '#val', function(){
            $('#name').text('@'+$(this).text())
            $('#nameLink').attr("href", "/profile/"+$(this).text())
            $('#receiverName').val($(this).text())
        })
        $('#numValue').text('('+data.length+')')
        $('#users').html(ol)
    })

    socket.on('newMsg', data => {
        const template = $('#message-template').html()
        const message = Mustache.render(template, {
            text: data.text,
            sender: data.sender
        })
        $('#messages').append(message)
    })
    $('#message-form').on('submit', function(e){
        e.preventDefault()
        const msg = $('#msg').val()
        const sender = $('#sender').val()
        socket.emit('createMsg', {
            text: msg,
            room: room,
            sender: sender
        }, function(){
            $('#msg').val('')
        })
    })
})