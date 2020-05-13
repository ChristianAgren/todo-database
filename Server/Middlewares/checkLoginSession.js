
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
        res.status(401).json({err: "user is not logged in"})
    }
}