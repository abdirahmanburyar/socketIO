'use strict'

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Users = require('../models/User')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    Users.findById(id, (err, user) => {
        done(err, user)
    })
})

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},(req, email, password, done) => {
    Users.findOne({'email': email}, (err, user) => {
        if(err) return done(err)
        if(user){
            return done(null, false, req.flash('error', 'User with email already exist'));
        }
        
        const registerUser = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
            createdAt: new Date().getTime()
        }
        const newUser = new Users(registerUser)
        newUser.save(err => {
            done(null, newUser)
        })
    })
}))

passport.use('local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},(req, email, password, done) => {
    Users.findOne({'email': email}, (err, user) => {
        if(err) return done(err)
        const messages = []
        if(!user || !user.checkPassword(password)){
            messages.push('Email/Password Incorrect')
            return done(null, false, req.flash('error', messages));
        }
        
        return done(null, user)
    })
}))