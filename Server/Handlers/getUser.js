const User = require('../Models/userModel')
// Find specific user
module.exports = async function (req, res, next) {
    let user 
    let condition;
    
    if (req.body.name) condition = req.body.name
    if (req.params.name) condition = req.params.name

    try {
        user = await User.findOne({name: condition})        
        if (user == null) {            
            return res.status(404).json({ err: 'Can not find user' })
        }
    } catch (err) {        
        return res.status(500).json({ err: err.message })
    }
    res.user = user
    next()
}