

export default function handler(req, res) {
    let nodemailer = require('nodemailer');
    require('dotenv').config();
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });

    const mailData = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: `Message from ${req.body.fullName}`,
        text: `Name: ${req.body.fullName}\nEmail: ${req.body.email}\nMessage: ${req.body.message}`,
    };
    
    transport.sendMail(mailData, (err, info) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error sending email');
        } else {
            console.log(info);
            res.status(200).send('Email sent successfully');
        }
    })
}