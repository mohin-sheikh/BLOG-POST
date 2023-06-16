let { getObjectFromJWT } = require('../security/jwt');
let { setDecodedPayload, getDecodedPayload } = require('../helper/auth');
const { status, message } = require("../validator/utils");
const rs = require("../constants/response.structure");


exports.verifyToken = async (req, res, next) => {
    let auth = req.get('Authorization')
    if (!auth) {
        res
            .status(status.success)
            .send(rs.getResponseStructure(status.success, message.tokenMissing));
    } else {
        let token = auth.split(' ')[1];
        if (!token) {
            res
                .status(status.success)
                .send(rs.getResponseStructure(status.success, message.tokenMissing));
        } else {
            try {
                setDecodedPayload(req, getObjectFromJWT(token));
                req.user = getDecodedPayload(req);
                req.user = req.user.user
                next();
            } catch (err) {
                console.log(err);
                if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError")
                    return res.status(200).send("SESSION EXPIRED")
                return res.status(200).send("FAILURE")
            }
        }
    }
};
