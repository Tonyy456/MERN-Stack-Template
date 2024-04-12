
const db = require('../config/db');
const User = require('../api/users/user.model');
const crypt = require('bcryptjs');
const prompt = require('prompt-sync')();

db().then( async () => {
    const name = prompt('What is your name? ');
    const email = prompt('What is your email? ');
    const password = prompt('What is your password? ');
    // verify unique user.
    const existingUser = await User.findOne({email});
    if (existingUser) {
        console.log('email already exists');
        return
    }

    // create user
    const hashedPassword = crypt.hashSync(password);
    const user = new User({
        name, email, 
        password: hashedPassword
    });
    
    user.save()
        .then(() => console.log('worked!'))
        .catch(() => console.log('no :('));
})
process.exit;