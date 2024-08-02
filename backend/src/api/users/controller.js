/**
    @author: Anthony D'Alesandro

    Methods available to the client.
*/

const bcrypt = require('bcryptjs');
const User = require('./model');
const jwt = require('jsonwebtoken')

const { cookieName } = require('../../middleware/auth');
const e = require("express");
const cookieAliveHrs = 100;

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const Controller = {
    clearCookie: function (res) {
        res.clearCookie(cookieName);
    },
    /** Generates user cookies.
     *
     * - always generate a new access token
     * - recycle refresh token if possible.
     * */
    generateAccessToken: function (payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}hr`
        })
        const accessTokenExpiresAt = (new Date(Date.now() + process.env.ACCESS_TOKEN_EXPIRES_IN * 3600 * 1000)).toISOString();
        return {accessToken, accessTokenExpiresAt};
    },
    getRefreshToken: async function (machineID, user, payload) {
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: `${process.env.REFRESH_TOKEN_EXPIRES_IN}hr`
        })
        const refreshTokenExpiresAt = (new Date(Date.now() + process.env.REFRESH_TOKEN_EXPIRES_IN * 3600 * 1000)).toISOString();


        const oldTokens = user.refreshTokens.filter(x => x.machineID === machineID)
        await User.findOneAndUpdate({_id: user._id}, {$pullAll: { refreshTokens: oldTokens}});

        // create a new entry.
        const newUser = await User.findOneAndUpdate({_id: user._id}, {$push: { refreshTokens: {
                token: refreshToken,
                machineID: machineID,
                creationDate: (new Date()).toISOString()
            }}}
        );

        return {refreshToken, refreshTokenExpiresAt};
    },
    /** Refreshes the authentication token and user login credentials. */
    RefreshTokens: async function (req,res) {
        if(req.userID === -1 || !req.userID) return res.status(401).json({message: "Invalid authentication. Not logged in."});
        let user = await User.findById(req.userID, "-password -__v").lean();
        if (!user) return res.status(204).json({error: "Token seems to match user that does not exist"});

        const accessTokenResponseObject = Controller.generateAccessToken({_id: req.userID })
        const refreshTokenResponseObject = await Controller.getRefreshToken(req.machineID, user, {_id: req.userID})
        delete user.refreshTokens;
        console.log(`User refreshed auth to server: ${user.name} `)
        return res.status(200).json({message: "Refreshed user login credentials",
            ...accessTokenResponseObject,
            ...refreshTokenResponseObject,
            user
        })
    },

    /** Function to handle login.
     * @body: {email, password}
     * */
    Login: async function (req, res){
        // verify login credentials
        const {email, password} = req.body;
        const existingUser = await User.findOne({email: email}).lean();
        if (!existingUser) {
            return res.status(400).json({message:"Invalid Email / Password"})
        }
        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordCorrect){
            return res.status(400).json({message: 'Invalid Email / Password'})
        }

        // generate tokens
        const accessTokenResponseObject = Controller.generateAccessToken({_id: existingUser._id })
        const refreshTokenResponseObject = await Controller.getRefreshToken(req.machineID, existingUser, {_id: existingUser._id})

        delete existingUser.password; // dont send that over!
        delete existingUser.__v;
        console.log(`User logged in to server: ${existingUser.name} `)
        return res.status(200).json({message: 'Successfully Logged In',
            ...accessTokenResponseObject,
            ...refreshTokenResponseObject,
            user: {
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
            },
        })

    },

    /** Function to handle logout.
     * @body: {}
     * */
    Logout: async function  (req, res) {
        if (req.userID === -1) {
            return res.status(400).json({message: "Must be logged in to log out!"})
        }
        const existingUser = await User.findOne({_id: req.userID}).lean();
        const oldTokens = existingUser.refreshTokens.filter(x => x.machineID === req.machineID)
        await User.findOneAndUpdate({_id: existingUser._id}, {$pullAll: { refreshTokens: oldTokens}});
        console.log(`User logged out: ${existingUser.name}`)
        Controller.clearCookie(res);
        return res.status(200).json({message: "Successfully Logged Out!"});
    },

    /** Function to handle a request of user data.
     * @requires: req.params.id
     * @body: {}
     * */
    Get: async function (req, res) {
        const userId = req.params.id;
        const user = await User.findById(userId, "-password -refreshTokens").lean();
        if (!user) return res.status(404).json({message: "User Not Found"});
        return res.status(200).json({user})
    },

    /** Function to get all users.
     * @body: {}
     * */
    GetAll: async function (req, res){
        try {
            const users = await User.find().lean();
            res.status(200).json({users})
        } catch (error) {
            res.status(500).json({error})
        }
    },

    /** Updates user based on request data.
     * @requires: req.params.id
     * @body: contains any {email, name, password, newpassword}
     * */
    Update: async function (req, res) {
        // verify user exists.
        const {email, name, password, newpassword } = req.body;
        if(!email && !name && !password && !newpassword) return res.status(400).json({message:"Data is not parseable."})
        const userId = req.params.id;
        const existingUser = await User.findOne({_id: userId}).lean();
        if (!existingUser) {
            return res.status(400).json({message:"User ID does not exist!"})
        }

        // the object that represents WHAT will be updated in final function call.
        let update = {}
        if(email) {
            if (!validateEmail(email)) return res.status(400).json({message:"Email is not valid"})
            update.email = email;
        }
        if(name) update.name = name;

        // update password if both old and new password are passed.
        if(password && newpassword) {
            const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

            // dont allow someone to update password to the same thing...
            if (newpassword === password && isPasswordCorrect) return res.status(400).json({message:"Use a different password."})

            if (!isPasswordCorrect){
                return res.status(400).json({message: 'Invalid Password.'})
            } else {
                update.password = bcrypt.hashSync(newpassword);
            }
        } else if (password || newpassword) return res.status(400).json({message: 'Must provide both old password and new password.'})
        const updatedUser = await User.findOneAndUpdate({_id: userId}, update, {new: true}).lean()
        delete updatedUser.password;
        delete updatedUser.__v;
        updatedUser.passwordUpdated = !!update.password; // true if password is defined.
        return res.status(200).json({message: 'Successfully Updated User.', updatedUser})
    },

    /** Deletes a user from the database.
     * @requires: req.params.id
     * @body: {}
     * */
    Delete: async function (req, res) {
        const user = await User.findByIdAndDelete({_id: req.params.id}).lean();
        if (!user) return res.status(404).json({message: "Unable to find user: " + req.params.id});
        return res.status(202).json({message: "Deleted user: " + req.params.id});
    },
}



module.exports = Controller