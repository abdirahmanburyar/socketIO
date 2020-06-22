const dependable = require('dependable')
const path = require('path')

const container = dependable.container()

const dependencies = [
    ['_', 'lodash'],
    ['passport', 'passport'],
    ['validator', 'express-validator'],
    ['async', 'async'],
    ['Clubs', './models/Clubs'],
    ['User', './models/User']
]

dependencies.forEach(function(val) {
    container.register(val[0], function() {
        return require(val[1])
    })
})


container.load(path.join(__dirname, '/controller'))
container.load(path.join(__dirname, '/helpers'))

container.register('container', function() {
    return container
})

module.exports = container