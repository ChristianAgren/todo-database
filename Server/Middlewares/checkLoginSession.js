
module.exports = function (req, res, next) {
    let user
    if(req.session.id) {
        user = {
            name: req.session.username,
            admin: req.session.admin
        }
        res.session = user
        next()
    } else {
        res.json({err: { login: "Please renew your login session!" }})
    }
}