import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "novacare2308@gmail.com",
    pass: "wckwbwqvkiyhgmgh",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMailforgot(to,subject,text,html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'novacare2308@gmail.com', // sender address
    to,
    subject,
    text,
    html
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

export default sendMailforgot
