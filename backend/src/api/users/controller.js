/**
    @author: Anthony D'Alesandro

    Methods available to the client.
*/

const crypt = require('bcryptjs');
const User = require('./model');
const jwt = require('jsonwebtoken')

// Cookie alive time
const cookieAliveHrs = 100;
const cookieName = 'user_auth_cookie';

const Controller = {
    /** Clears the user cookies. */
    _clearUserCookies: function (res) {
        res.clearCookie(cookieName)
    },

    /** Generates user cookies and sets them in the response */
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

    /** Function to handle login. */
    login: async function (req, res){
        // verify login credentials
        const {email, password} = req.body;
        const existingUser = await User.findOne({email: email});
        if (!existingUser) {
            return res.status(400).json({message:"Invalid Email / Password"})
        }
        const isPasswordCorrect = crypt.compareSync(password, existingUser.password);
        if (!isPasswordCorrect){
            return res.status(400).json({message: 'Invalid Email / Password'})
        }

        // generate tokens
        Controller._clearUserCookies(res);
        Controller._generateUserCookies(existingUser._id, req, res);

        delete existingUser.password; // dont send that over!
        return res.status(200).json({message: 'Successfully Logged In', user: existingUser})

    },

    /** Function to handle a request of user data. */
    GetUser: async function (req, res) {
        const userId = req.params.id;
        const user = await User.findById(userId, "-password");
        if (!user) return res.status(404).json({message: "User Not Found"});
        return res.status(200).json({user})
    },

    /** Refreshes the authentication token and user login credentials. */
    RefreshTokens: async function (req, res) {
        if (req.user === -1) {
            return res.status(206).json({message: "Authentication Invalid. Must be Logged in to refresh tokens!"})
        }

        const user = await User.findById(req.user, "-password");
        if (!user) return res.status(500).json({error: "Token seems to match user that does not exist"});

        // regenerate cookies.
        Controller._clearUserCookies(req, res);
        Controller._generateUserCookies(req, res);
        return res.status(200).json({message: "Refreshed user login credentials", user})
    },

    /** Function to handle logout. */
    Logout: async function  (req, res) {
        if (req.user === -1) {
            return res.status(400).json({message: "Must be logged in to log out!"})
        }
        Controller._clearUserCookies(req, res);
        return res.status(200).json({message: "Successfully Logged Out!"});
    },

    /** Function to get all users. */
    GetUsers: async function (req, res){
        try {
            const users = await User.find();
            res.status(200).json({users})
        } catch (error) {
            res.status(500).json({error})
        }
    },

    /** Updates user based on request data. */
    UpdateUser: async function (req, res) {
        try {
            const userId = req.params.id;
            const {email, name } = req.body.inputs;
            const existingUser = await User.findOne({_id: userId});
            if (!existingUser) {
                return res.status(400).json({message:"Not an existing user. mostly likely a server side issue"})
            }

            await User.findOneAndUpdate({_id: existingUser._id}, {email: email, name: name})

            return res.status(204).json({message: 'Successfully Updated Admin User'})
        } catch (error) {
            res.status(500).json({error})
        }
    },

    /** Updates user password based on request data. */
    UpdatePassword: async function (req, res) {
        try {
            const userId = req.params.id;
            const {oldpassword, newpassword } = req.body.inputs;

            const existingUser = await User.findOne({_id: userId});
            if (!existingUser) {
                return res.status(400).json({message:"Invalid user."})
            }
            const isPasswordCorrect = crypt.compareSync(oldpassword, existingUser.password);
            if (!isPasswordCorrect){
                return res.status(400).json({message: 'Invalid Email / Password'})
            }
            const hashedPassword = crypt.hashSync(newpassword);

            await User.findOneAndUpdate({_id: existingUser._id}, {password: hashedPassword})

            return res.status(204).json({message: 'Successfully Updated Admin User'})
        } catch (error) {
            res.status(500).json({error})
        }
    },

    /** Deletes a user from the database. */
    DeleteUser: async function (req, res) {
        try {
            if (req.user === -1) return res.status(401).json({error: "Not authorized to delete a user!"});
            if (req.user === req.params.id) return res.status(400).json({error: "Can not delete currently logged in user!"});
            const user = await User.findByIdAndDelete(req.params.id);
            if (!user) return res.status(404).json({error: "Unable to find user " + req.params.id});
            return res.status(204).json({message: "Deleted user " + req.params.id});
        } catch (error) {
            res.status(500).json({error})
        }
    },
}



module.exports = Controller