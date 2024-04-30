import nodemailer from "nodemailer";
import config from "../../../config";

const senderEmail = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.sendEmail.email,
      pass: config.sendEmail.email_key,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: '"DocConnect App 👻" <jubair.official97@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "This is your reset Password ", // Subject line
    html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};

export default senderEmail;
