const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const socketIO = require('socket.io')
const { UsersClass } = require('./helpers/Users')
const container = require('./container')

container.resolve(function(users,_,home,group,profile) {
    mongoose.set('useCreateIndex', true);
    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost:27017/socketIODB', { useNewUrlParser: true, useUnifiedTopology:true })
    const app = SetupExpress()

    function SetupExpress(){
        const app = express()
        const server = http.createServer(app)
        const io = socketIO(server)
        server.listen(5001, () => {
            console.log('server is running on port 5001')
        })
        configureExpress(app)

        require('./socket/groupchat')(io, UsersClass)
        require('./socket/sentRequest')(io)

        const router = require('express-promise-router')()
        
        //handle routes
        users.SetRouting(router)
        home.SetRouting(router)
        group.SetRouting(router)
        // profile.SetRouting(router)
        app.use(router)
    }
        function configureExpress(app){
            require('./auth/passport-local')

            app.use(express.static(path.join(__dirname, '/public')))
            app.use(cookieParser())
            app.set('view engine', 'ejs')
            app.use(bodyParser.json())
            app.use(bodyParser.urlencoded({ extended: true }))

            app.use(session({
                secret: 'thisistheskeleronoftheaooitshouldbekept',
                resave: false,
                saveUninitialized: false,
                store: new MongoStore({ mongooseConnection: mongoose.connection })
            }))

            app.use(flash())
            app.use(passport.initialize())
            app.use(passport.session())

            app.locals._ = _;
    }
})