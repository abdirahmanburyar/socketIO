$(document).ready(function(){
    const socket = io()
    const room = $('#groupName').val()
    
    socket.on('connect', function(){
        console.log('yes, user connected!')
        const params = {
            room: room
        }
        socket.emit('join', params, function(){
            console.log('user has joined this channel')
        })
    })
    socket.on('newMsg', data => {
        console.log(data)
    })
    $('#message-form').on('submit', function(e){
        e.preventDefault()
        const msg = $('#msg').val()
        const username = $('#username').val()
        socket.emit('createMsg', {
            text: msg,
            room: room,
            user: username
        }, function(){
            $('#msg').val('')
        })
    })
})