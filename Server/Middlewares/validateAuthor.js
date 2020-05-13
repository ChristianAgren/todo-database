
module.exports = function (req, res, next) {
    if (res.assignment) {
        if (res.assignment.parentId === req.session.id || req.session.admin) {
            next()
        }
    }   else {
        res.status(401).json({ message: 'Unauthorized' })
    }
}