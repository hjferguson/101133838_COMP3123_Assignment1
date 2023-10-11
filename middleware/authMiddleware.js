const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
    const token = req.header('Authorization').split(' ')[1];
    
    jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: false,
                message: 'Unauthorized'
            });
        }
        req.userId = decoded.userId;
        next();
    });
}

module.exports = checkAuth;