import { Request, Response } from "express";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import ENV from "../config";

// Configuration for nodemailer
const nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: ENV.EMAIL,
        pass: ENV.PASSWORD,
    },
};

// Create a nodemailer transporter
const transporter = nodemailer.createTransport(nodeConfig);

// Create a Mailgen instance
const MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: 'Mailgen',
        link: 'https://mailgen.js/'
    }
});

// Define the interface for request with additional properties
interface RequestRegisterMail extends Request {
    body: {
        username: string;
        userEmail: string;
        mailtext: string;
        subject: string;
    };
}

// Define the registerMail function
export const registerMail = async (req: RequestRegisterMail, res: Response) => {
    const { username, userEmail, mailtext, subject } = req.body;

    // Generate email body
    const email = {
        body: {
            name: username,
            intro: mailtext || 'Welcome to Daily Tuition! We\'re very excited to have you on board.',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };
    const emailBody = MailGenerator.generate(email);

    // Create message object
    const message = {
        from: ENV.EMAIL,
        to: userEmail,
        subject: subject || "Signup Successful",
        html: emailBody
    };

    // Send email
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "You should receive an email from us." });
        })
        .catch(error => {
            res.status(500).send({ error });
        });
};
