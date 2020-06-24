const { param } = require("express-validator")
const { concatSeries } = require("async")

module.exports = function(io){
    io.on('connection', socket => {
        socket.on('joinRequest', (params, callback) => {
            socket.join(params.username)
            
            callback()
        })
        socket.on('friendRequest', (params, callback) => {
            console.log(params)
           io.to(params.receiverName).emit('newFriendRequest', {
               from: params.senderEmail,
               to: params.receiverName
           })
            callback()
        })
    })
}