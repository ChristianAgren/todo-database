

module.exports = function (req, res, next) {
    // if (req.session.id) console.log(`User ${req.session.id} is logged in`);
    // if (!req.session.id) console.log(`User is not logged in`);
     
    let userSession = req.session.id
    let loggedIn = false
    if (userSession) loggedIn = true
    // console.log(`Logged in: ${loggedIn}`);
    // console.log(req.route);

    res.append('userLoggedIn', loggedIn)
    
    next()
}