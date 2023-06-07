import nodemailer from 'nodemailer';

const options = {
  //host: process.env.NODEMAILER_HOST,
  //port: Number(process.env.NODEMAILER_PORT),
  host: 'smtp.mail.ru',
  port: 465,
  secure:true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
};

const transport = nodemailer.createTransport(options);

export default transport;
