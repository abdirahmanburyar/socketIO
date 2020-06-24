'use strict'
module.exports = function(async, User){
    return {
        SetRouting: function(router){
            router.get('/group/:clubName', this.getGroup)
            router.post('/group/:room', this.groupPostPage)
        },
        getGroup: function(req, res){
            const name = req.params.clubName
            async.parallel([
               function(callback){
                User.findById(req.user._id)
                .populate('request.userId')
                .exec((err, result) => {
                        callback(err, result);
                    })
               }
            ], function(err, result){
                const currentUser = result[0]
                res.render('groupchat/group', { title: 'Footballkik - groups', data: currentUser, user: req.user, groupName: name})
            })
        },
        groupPostPage: (req, res) => {
            async.parallel([
                function(callback){
                    if(req.body.receiverName){
                        User.updateOne(
                            {
                            'fullName': req.body.receiverName,
                            'request.userId': { $ne: req.user._id},
                            'friendsList.friendId': { $ne: req.user._id}
                        },
                        {
                            $push: { request: {
                                userId: req.user._id,
                                username: req.user.fullName
                            }},
                            $inc: { totalRequest: 1 }
                        }, function(err, count){
                            callback(err, count)
                        })
                    }
                },
                function(callback){
                    if(req.body.receiverName){
                        User.updateOne(
                            {
                            'fullName': req.user.fullName,
                            'sentRequest.fullName': {$ne: req.body.receiverName }
                        },
                        {
                            $push: { sentRequest: {
                                fullName: req.body.receiverName
                            }}
                        }, function(err, count){
                            callback(err, count)
                        })
                    }
                }
            ], function(err, result){
                res.redirect('/group/'+req.params.room)
            })
        }
    }
}