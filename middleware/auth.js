const jwt = require('jsonwebtoken');

exports.checkToken = (req, res, next) => {
    // Get the token from the headers
    let token = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['Authorization'];

    // Check if no token was provided
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Remove Bearer from string
        const bearer = token.split(' ');
        const bearerToken = bearer[1];
        token = bearerToken;

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;

        next();
    } catch (error) {
        if(!res.headersSent)  return res.status(400).json({ message: 'Invalid token.' });
    }
};

exports.isadmin = (req, res, next) => {
    let role = req.user.role;
    // Check if no token was provided
    if (!role) {
        return res.status(401).json({ message: 'no role is given to you' });
    }
    try {
        //if not admin then return
        if (role != 'admin') {
            return res.status(401).json({ message: 'you are not admin' });
        }
        next();
    } catch (error) {
        if(!res.headersSent)  return res.status(400).json({ message: 'Invalid token.' });
    }
};