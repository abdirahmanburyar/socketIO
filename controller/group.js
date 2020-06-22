'use strict'
module.exports = function(async, User){
    return {
        SetRouting: function(router){
            router.get('/group/:clubName', this.getGroup)
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
        }
    }
}