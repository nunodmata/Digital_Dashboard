// key 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
require('dotenv').config()
const sgMail = require('@sendgrid/mail')


SENDGRID_API_KEY='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'

sgMail.setApiKey(SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name)=> {
    sgMail.send({
        to:email,
        from:'nunomata619@gmail.com',
        subject:'Thanks for joining Digital Dashboard :) ',
        text: `Welcome ${name}, hope you have a nice time arround here! \n\n\n Have a good one, \n Digital Dashboard` 
    })
}


const sendCancelationEmail = (email, name)=> {
    sgMail.send({
        to:email,
        from:'nunomata619@gmail.com',
        subject:'It is sad to see you go... ',
        text: `Goodbye ${name}, it was nice to have you :) \n\n\n Have a good one, \n Digital Dashboard`
    })
}


module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}