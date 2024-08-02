const jwt = require('jsonwebtoken')
const userModel = require('../api/users/model')
require("dotenv").config();

const cookieName = 'user_auth_cookie'


/*
    - Checks if user has a valid access token or refresh token. in either case. user is considered logged in.
 */
const auth = async(req, res, next) => {
    // Check for access token
    req.userID = -1;
    req.machineID = req.headers['client-id'];
    if (req.headers.authorization) {
        req.accessToken = req.headers.authorization.split(' ')[1]
        req.refreshToken = req.headers['x-refresh-token'];
        req.accessTokenAuthorized = false;
        jwt.verify(String(req.accessToken), process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(!err) {
                req.userID = decoded._id;
                req.accessTokenAuthorized = true;
            } else {console.log('[DEBUG] using expired access token.')}
        })
        if(req.userID === -1) {
            jwt.verify(String(req.refreshToken), process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if(!err) {
                    req.userID = decoded._id;
                } else { console.log('[DEBUG] using expired refresh token.')}
            })

            // verify that the refresh token used is valid. otherwise, considered not logged in.
            if(req.userID !== -1){
                const user = await userModel.findOne({_id: req.userID});
                const machineIDToken = user.refreshTokens.find(x => x.machineID === req.machineID)
                if(!machineIDToken) {
                    req.userID = -1;
                    console.log('[DEBUG] machine ID has no valid refresh tokens for requested user.');
                } //TODO: might need fixed.
                const validRefreshToken = machineIDToken && machineIDToken.token === req.refreshToken;
                if(!validRefreshToken) {
                    req.userID = -1
                    console.log('[DEBUG] machine ID is using the wrong token.')
                }
            }
        }
    }
    next();
}

/**
 * @param options
 *      allowTypes: [],
 */
const requireAuth = options => async (req, res, next) => {
    if (req.userID === -1 || !req.userID) {
        return res.status(401).json({message: "Invalid authentication. Not logged in."})
    }
    const entry = await userModel.findOne({ _id: req.userID });
    if(!entry) return res.status(401).json({message: "Invalid authentication. User was deleted or cookie created incorrectly."})
    if(options.allowTypes && !options.allowTypes.includes(entry.type)) {
        return res.status(401).json({message: `Invalid user. Must be of the following types: ${options.allowTypes}`});
    }
    next();
}

const requireAdmin = requireAuth({allowTypes: ['admin']});

module.exports = {
    auth,
    requireAuth,
    requireAdmin,
    cookieName
};