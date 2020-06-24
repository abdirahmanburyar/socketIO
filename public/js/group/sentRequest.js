$(document).ready(function(){
    const socket = io()
    const senderEmail = $('#sender-email').val() 
    const senderName = $('#sender').val()
    const room = $('#groupName').val() 
    socket.on('connect', () => {
        const params = {
            username: senderName,
            email: senderEmail
        }
        socket.emit('joinRequest', params, function(){
            console.log('joined')
        })
    })
    socket.on('newFriendRequest', data => {
        console.log(window.location.href)
        $('#reload').load(window.location.href + ' #reload');
    })
        $('#add_friend').on('submit', function(e){
            e.preventDefault()
            
                $.ajax({
                    url: '/group/'+room,
                    method: 'POST',
                    data: {
                        receiverName: $('#receiverName').val(),
                        senderName: senderName,
                        senderEmail: senderEmail
                    },
                    success: function(data){
                        socket.emit('friendRequest', {
                            senderEmail: senderEmail,
                            receiverName
                        }, function(){
                            console.log('request sent..')
                        })
                    }
                })
        })
    
})