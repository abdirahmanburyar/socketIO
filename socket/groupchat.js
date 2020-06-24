module.exports = function(io, UsersClass){
    const users = new UsersClass()
    io.on('connection', socket => {
        socket.on('join', (params, callback) => {
            socket.join(params.room)
            users.addToUsers(socket.id, params.sender, params.room, params.email)
            
            io.to(params.room).emit('getUsersList', users.getUsersList(params.room))
            callback()
        })
        socket.on('createMsg', (data, callback) => {
            io.to(data.room).emit('newMsg', {
                text: data.text,
                room: data.room,
                sender: data.sender
            })
            callback()
        })

        socket.on('disconnect', () => {
            const user = users.removeUser(socket.id)
            
            if(user){
                io.to(user.room).emit('getUsersList', users.getUsersList(user.room))
            }
        })
    })
}