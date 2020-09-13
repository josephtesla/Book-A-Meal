
import nodemailer from 'nodemailer';

const credentials = {
  user: process.env.EMAIL_FROM,
  pass: process.env.EMAIL_PASSWORD
}

export default function sendMail({from, to, subject, body}) {
  return new Promise((resolve, reject) => {
    const mailTransport = nodemailer.createTransport({
      service:'Gmail',
      auth: {
        user: credentials.user,
        pass: credentials.pass
      }
    });
    mailTransport.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: body,
      generateTextFromHtml: true
    }, (error, info) => {
      if (error) reject(`Unable to send requested email message: ${error}`);
      else{
        resolve('Email message successfully sent:', info);
      }
    })
  })
}

