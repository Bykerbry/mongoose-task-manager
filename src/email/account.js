const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'bryce1492@gmail.com',
        subject: 'Welcome to the Task App',
        text: `Hello There, ${name}!`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: 'bryce1492@gmail.com',
        from: email,
        subject: 'Successfully deleted Task App account',
        text: `Sorry to see you go, ${name}!`
    })

}
module.exports = { 
    sendWelcomeEmail, 
    sendCancelEmail
}
