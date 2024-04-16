/**
    @author: Anthony D'Alesandro

    Methods available to the client.
*/

const bcrypt = require('bcryptjs');
const User = require('./model');
const jwt = require('jsonwebtoken')

const { cookieName } = require('../../middleware/auth');
const cookieAliveHrs = 100;

const Controller = {
    /** Clears the user cookies. */
    _clearUserCookies: function (res) {
        res.clearCookie(cookieName)
    },

    /** Generates user cookies and sets them in the response. */
    _generateUserCookies: function (userId,req, res) {
        if (userId === -1) return;
        const token = jwt.sign({_id: userId}, process.env.JWT_SECRET_KEY, {
            expiresIn: `${cookieAliveHrs}hr`
        })
        if(token && userId){
            res.cookie(cookieName, token, {
                path: '/',
                expires: new Date(Date.now() + cookieAliveHrs * 60 * 60 * 1000),
                httpOnly: true,
                sameSite: 'lax'
            })
        }
        return token;
    },

    /** Refreshes the authentication token and user login credentials. */
    RefreshTokens: async function (req,res) {
        const user = await User.findById(req.user, "-password -__v").lean();
        if (!user) return res.status(500).json({error: "Token seems to match user that does not exist"});

        // regenerate cookies.
        Controller._clearUserCookies(res);
        Controller._generateUserCookies(user._id, req, res);
        return res.status(200).json({message: "Refreshed user login credentials", user})
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
        Controller._clearUserCookies(res);
        Controller._generateUserCookies(existingUser._id, req, res);

        delete existingUser.password; // dont send that over!
        delete existingUser.__v;
        return res.status(200).json({message: 'Successfully Logged In', user: existingUser})

    },

    /** Function to handle logout.
     * @body: {}
     * */
    Logout: async function  (req, res) {
        if (req.user === -1) {
            return res.status(400).json({message: "Must be logged in to log out!"})
        }
        Controller._clearUserCookies(res);
        return res.status(200).json({message: "Successfully Logged Out!"});
    },

    /** Function to handle a request of user data.
     * @requires: req.params.id
     * @body: {}
     * */
    Get: async function (req, res) {
        const userId = req.params.id;
        const user = await User.findById(userId, "-password").lean();
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
        const userId = req.params.id;
        const existingUser = await User.findOne({_id: userId}).lean();
        if (!existingUser) {
            return res.status(400).json({message:"User ID does not exist!"})
        }

        // the object that represents WHAT will be updated in final function call.
        let update = {}
        if(email) update.email = email;
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
        }
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