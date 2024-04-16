const jwt = require('jsonwebtoken')
require("dotenv").config();

const cookieName = 'user_auth_cookie'

const auth = async(req, res, next) => {
    const token = req.cookie[cookieName];
    console.log(token);
    req.user = -1;
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
        if (!err) {
            req.user = user._id;
        }
        if (err) console.log('Token is invalid');
    })
    next();
}



module.exports = {
    auth,
    cookieName
};