module.exports = {
    apiAuthCheck: function (req, res, next) {
        if (!req.user) {
            //figure out where we were trying to go - different behavior based on api vs html
            res.sendStatus(401);
        } else {
            next();
        }
    },
    htmlAuthCheck: function(req, res, next) {
        if (!req.user) {
            //figure out where we were trying to go - different behavior based on api vs html
            res.redirect("/login");
        } else {
            next();
        } 
    }
}