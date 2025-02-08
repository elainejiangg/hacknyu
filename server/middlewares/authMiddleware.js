exports.isLoggedIn = (req, res, next) => {
    console.log('isAuthenticated:', req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
};
