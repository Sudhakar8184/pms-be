// const nodemailer = require('nodemailer');

// // Create a transporter object using the default SMTP transport
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.SENDER_EMAIL, // Your email address
//         pass: process.env.SENDER_PASSWORD // Your password
//     }
// });

// const sendEmail = async (mailOptions) => {
//     try{
//     await transporter.sendMail(mailOptions);
//     } catch (error) {
//       console.log(error)
//     }
// }

// module.exports = {sendEmail};
