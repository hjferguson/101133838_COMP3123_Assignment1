const jwt = require('jsonwebtoken');

function checkAuth(req, res, next) {
    const authHeader = req.header('Authorization');

    // Check if the Authorization header is present
    if (!authHeader) {
        return res.status(401).json({
            status: false,
            message: 'No authorization token provided'
        });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: false,
                message: 'Unauthorized: Invalid token'
            });
        }
        req.userId = decoded.userId;
        next();
    });
}

module.exports = checkAuth;
