const {Resend} = require('resend')
require('dotenv').config();
const resend = new Resend(process.env.EMAIL_API);

(async () => {
    const {data, error} = await resend.emails.send({
        from: "guns@guns.dev",
        to: ["ajdalesandro0115@gmail.com"],
        subject: "MERN Stack Template example email.",
        html: "<strong>Get back to work!</strong>",
    });
})()