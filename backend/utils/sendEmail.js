import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

const sendEmail = async (options)=>{
    console.log(options);
    const info = await transporter.sendMail({
        from: `Skomm <${process.env.SMTP_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    });
    
    console.log("Message sent: " + info.messageId);
};

export default sendEmail;