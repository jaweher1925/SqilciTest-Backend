const nodemailer = require('nodemailer');
require('dotenv').config();
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import Mail from 'nodemailer/lib/mailer'


const transport = nodemailer.createTransport({
  host:process.env.MAIL_HOST,
 port:process.env.MAIL_PORT,
 auth:  {
  user: process.env.MAIL_USER,
  pass:process.env.MAIL_PASSWORD
 },
} as SMTPTransport.Options)

type sendEmailDto ={
  sender: Mail.Address,
  receipients:Mail.Address[],
  subject:string;
  message: string;
}

export const sendEmail = async (dto: sendEmailDto) => {
  const { sender, receipients, subject, message } = dto;

  try {
    const result = await transport.sendMail({
      from: sender,
      to: receipients.map(receipients=> receipients.address).join(', '),
      subject,
      html: message, // Use html for HTML content
      text: message  // Use text for plain text content
    });

    console.log('Email sent:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Ensure errors are propagated back to the caller
  }
}