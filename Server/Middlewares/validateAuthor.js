
module.exports = function (req, res, next) {
    console.log('validating changes');
    console.log(req.body);
    
    if (res.assignment) {
        console.log('found assignment');
        
        if (res.assignment.parentId == req.session.id || req.session.admin) {
            console.log('valid user');
            next()
        }
    } else if (req.body.assignmentParentId) {
        console.log('found subtask');

        if (req.body.assignmentParentId == req.session.id || req.session.admin) {
            console.log('valid user');
            next()
        }
    } else {
        console.log('invalid user');
        res.status(401).json({ message: 'Unauthorized' })
    }
}