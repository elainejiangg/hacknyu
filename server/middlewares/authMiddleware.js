exports.isLoggedIn = (req, res, next) => {
    console.log('isAuthenticated:', req.isAuthenticated());
    if (req.isAuthenticated()) {
        req.userId = req.session.passport.user;
        console.log('UserID in isLoggedIn: ', req.userId)
        return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
};
