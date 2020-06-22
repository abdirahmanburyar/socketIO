'use strict'

const { count } = require("../models/User")

module.exports = function(async,_,Clubs){
    return {
        SetRouting: function(router){
            router.get('/home', this.homePage)
        },
        homePage: function(req, res) {
            async.parallel([
                function(callback){
                    Clubs.find({}, function(err, result){
                        callback(err, result)
                    })
                },
                function(callback){
                    Clubs.aggregate([{
                        $group: {
                            _id: '$country'
                            }
                        }]).exec(function ( err, data ) {
                            callback(err, data)
                    })
                }
            ], function(err, result){
                const result1 = result[0]
                let country = result[1]
                const dataChunk = []
                const chunkSize = 3
                for(let i=0; i<result1.length; i+=chunkSize){
                    dataChunk.push(result1.slice(i, i+chunkSize))
                }
                country = _.sortBy(country, '_id')
                res.render('home', { title: 'Footballkik | Home', data: dataChunk, country})
            })
        },
    }
}