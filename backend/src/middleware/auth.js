const jwt = require('jsonwebtoken')
const userModel = require('../api/users/model')
require("dotenv").config();

const cookieName = 'user_auth_cookie'

const auth = async(req, res, next) => {
    const token = req.cookies[cookieName];
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

/**
 * @param options
 *      allowTypes: [],
 */
const requireAuth = options => async (req, res, next) => {
    if (req.user === -1 || !req.user) {
        return res.status(401).json({message: "Invalid authentication. Admins only."})
    }
    const entry = await userModel.findOne({ _id: req.user });
    if(!entry) return res.status(401).json({message: "Invalid authentication. User was deleted or cookie created incorrectly."})
    if(options.allowType && !options.allowType.includes(entry.type)) {
        return res.status(401).json({message: "Invalid authentication. User type not allowed"});
    }
    next();
}




module.exports = {
    auth,
    requireAuth,
    cookieName
};