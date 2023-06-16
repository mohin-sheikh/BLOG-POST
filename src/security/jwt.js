const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.getJWTToken = (json) => {
    return jwt.sign(json, process.env.JWT_PRIVATE_KEY, { algorithm: 'RS256' });
};

exports.getObjectFromJWT = (token) => {
    return jwt.verify(token, process.env.JWT_PUBLIC_KEY, { algorithms: ['RS256'] });
};
