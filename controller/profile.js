module.exports = function(){
    return {
        SetRouting: router => {
            router.get('/profile/:username', (req, res) => {
                res.render('user/profile', { title: req.params.usernmae})
            })
            router.post('/group/:room', (req, res) => {
                console.log(req.body)
            })
        }
    }
}