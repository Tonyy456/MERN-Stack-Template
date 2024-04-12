/*
    Author: Anthony D'Alesandro

    user.controller.js - the controller to handle the API calls to anything related to the user model.
*/

const crypt = require('bcryptjs');
const User = require('./model');
const jwt = require('jsonwebtoken')
require("dotenv").config();

// set both to the tune of a couple hours.
const tokenAliveTime = '100hr'
const cookieAliveMs = 1000 * 60 * 60 * 100 // a hundred hours
const cookieName = 'tonydal_com_user_auth_cookie';

/*
    Clear Cookies. Mostly for logout & refresh functionality.
*/
async function clearUserCookies(req,res) {
    // req.cookies = {};
    // res.clearCookie('undefined')
    // res.clearCookie('-1')
    res.clearCookie(cookieName)
    return;
}

/*
    Generate cookies for user authentication.

    generates it for req.user
*/
async function generateUserCookies(req, res) {
    const userId = req.user;
    if (userId == -1) return;
    const token = jwt.sign({_id: userId}, process.env.JWT_SECRET_KEY, {
        expiresIn: tokenAliveTime
    })
    if(token && userId){
        res.cookie(cookieName, token, {
            path: '/',
            expires: new Date(Date.now() + cookieAliveMs),
            httpOnly: true,
            sameSite: 'lax'
        })
    }
    return token;
}

/*
    Login user. Gives authentication cookies.

    METHOD: post
*/
const login = async(req, res) => {
    try {
        // verify login credentials
        const {email, password } = req.body;
        const existingUser = await User.findOne({email: email});
        if (!existingUser) {
            return res.status(400).json({message:"Invalid Email / Password"})
        }
        const isPasswordCorrect = crypt.compareSync(password, existingUser.password);
        if (!isPasswordCorrect){
            return res.status(400).json({message: 'Invalid Email / Password'})
        }

        // genereate tokens
        req.user = existingUser._id.toString();
        clearUserCookies(req, res);
        const token = generateUserCookies(req, res);

        delete existingUser.password; // dont send that over!
        return res.status(200).json({message: 'Successfully Logged In', token, user: existingUser})
    } 
    catch (error)
    {
        return res.status(500).json({error})
    }
}

/*
    Get details on user. 

    METHOD: get
    Requires: Authenticated
    Parameter: id of user
*/
const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId, "-password");
        if (!user) return res.status(404).json({message: "User Not Found"});
        return res.status(200).json({user})
    } catch (error) {
        res.status(500).json({error})
    }
}

/*
    Refresh authenticated token. Used to maintain login status between pages. 

    METHOD: post
    Requires: Authenticated
*/
const refreshToken = async (req,res,next) => {
    if (req.user == -1) {
        return res.status(206).json({message: "Authenication Invalid. Must be Logged in to refresh tokens!"})
    }
    
    const user = await User.findById(req.user, "-password");
    if (!user) return res.status(500).json({error: "Token seems to match user that does not exist"});
    
    // regenerate cookies.
    clearUserCookies(req, res);
    const token = generateUserCookies(req, res);
    return res.status(200).json({message: "Refreshed user login credentials", user})
}

/*
    Logout user. 

    METHOD: post
    Requires: Authenticated
*/
const logout = async (req,res,next) => {
    if (req.user == -1) {
        return res.status(400).json({message: "Must be logged in to log out!"})
    }
    clearUserCookies(req, res);
    return res.status(200).json({message: "Successfully Logged Out!"});
}

/*
    Get list of all users. 

    METHOD: get
    Requires: Authenticated
*/
const getUsers = async (req,res) => {
    try { 
        const users = await User.find();
        res.status(200).json({users})
    } catch (error) {
        res.status(500).json({error})
    }
}

/*
    Update details on user. 
    NOT IMPLEMENTED
*/
const updateUser = async (req,res) => {
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
}
/* 

*/
const updatePassword = async (req, res) => {
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
}

/*
    delete user. 

    METHOD: delete
    Requires: Authenticated
*/
const deleteUser = async (req,res) => {
    try {
        if (req.user == -1) return res.status(401).json({error: "Not authorized to delete a user!"});
        if (req.user == req.params.id) return res.status(400).json({error: "Can not delete currently logged in user!"});
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({error: "Unable to find user " + req.params.id});
        return res.status(204).json({message: "Deleted user " + req.params.id});
    } catch (error) {
        res.status(500).json({error})
    }
}

module.exports = {
    login,
    getUser,
    refreshToken, 
    logout, 
    getUsers,
    updateUser,
    deleteUser,
    updatePassword
}