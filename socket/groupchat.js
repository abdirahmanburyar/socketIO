module.exports = io => {
    io.on('connection', socket => {
        socket.on('join', (params, callback) => {
            socket.join(params.room)
            callback()
        })
        socket.on('createMsg', (data, callback) => {
            console.log(data)
            io.to(data.room).emit('newMsg', {
                text: data.text,
                room: data.room,
                user: data.user
            })
            callback()
        })
    })
}