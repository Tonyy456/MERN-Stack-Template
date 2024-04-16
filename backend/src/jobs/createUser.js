/**
 *  Creates a user based on .env file.
 *  if parameters dont exist. exits safely.
 *
 *  @requires:
 *      ADMIN_EMAIL
 *      ADMIN_PASSWORD
 *      ADMIN_NAME
 */

require('dotenv').config();
const db = require('../config/db');
const User = require('../api/users/model');
const crypt = require('bcryptjs');

db().then( async () => {
    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    // verify unique user.
    const existingUser = await User.findOne({email});
    if (existingUser) {
        console.log('email already exists');
        process.exit();
    }

    // create user
    const hashedPassword = crypt.hashSync(password);
    const user = new User({
        name, email, 
        password: hashedPassword
    });
    
    await user.save()
        .then(() => console.log('Created Admin.'))
        .catch(() => console.log('Unable to create admin'));
    process.exit();
})
