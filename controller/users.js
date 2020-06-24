'use strict';
const { check, validationResult } = require('express-validator')
module.exports = function(_,passport) {
    return {
        SetRouting: function(router){
            
            router.get('/signup', this.getSingUp)
            router.get('/', this.getSignin)

            router.post('/signup', [
                check('fullName', 'Name is Required').notEmpty(),
                check('email', 'Email is Required').notEmpty(),
                check('email', 'Email is Invalid').isEmail(),
                check('password', 'Password is Required').notEmpty(),
                check('password', 'Password Must Not Be Less Than 5').isLength({min: 6})
            ], function (req, res, next) {
                const errors = validationResult(req)
                if (!errors.isEmpty()) {
                    const messages = []
                    const results = errors.array()
                    results.forEach(function(err){
                        messages.push(err.msg)
                    })
                    console.log(req.url)
                    if (messages.length > 0){
                        req.flash('error', messages);
                    if (req.url === '/signup'){
                        return res.redirect('/signup');
                    } else if(req.url === '/'){
                        return res.redirect('/')
                    }
                }
                }
                return next()
            }, this.postSignUp);
            router.post('/', [
                check('email', 'Email is Required').notEmpty(),
                check('password', 'Password is Required').notEmpty(),
            ], function (req, res, next) {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const messages = []
                const results = errors.array()
                results.forEach(function(err){
                    messages.push(err.msg)
                })
                if (messages.length > 0){
                    req.flash('error', messages);
                if (req.url === '/signup'){
                    return res.redirect('/signup');
                } else if(req.url === '/'){
                    return res.redirect('/')
                }
            }
            }
            return next()
        }, this.postSignIn);
        },

        getSingUp: function(req, res){
            const errors = req.flash('error');
            return res.render('signup', {title: 'Footballkk | SignUp', messages: errors, hasErrors: errors.length > 0});
        },
        getSignin: function(req, res){
            const errors = req.flash('error');
            return res.render('index', {title: 'Footballkk | SignIn', messages: errors, hasErrors: errors.length > 0});
        },
        postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),
        postSignIn: passport.authenticate('local.login', {
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true
        }),
    }
}
