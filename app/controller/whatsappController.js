const { sendEmail } = require("../services/email");
const { sendMessages } = require("../services/whatsapp");
var mongoose = require('mongoose');
var Member = mongoose.model('Members')



async function sendBulkMessages() {
    let memberDetails = await Member.find({ lastTrigged: null });

    const recipients = ['918008532848@s.whatsapp.net']; // List of recipients
   
    
    for (const member of memberDetails) {
        const phoneNumber = member.phoneNumber+'@s.whatsapp.net';
        const message = `Hello ${member.firstName}, How are you`; // Message to send
        try {
            await sendMessages(phoneNumber, message); // Send message to each recipient
        } catch (error) {
               console.error(`Error sending message to ${recipient}:`, error);
        }
        // if(member.email) {
            let mailOptions = {
                from: 'sudhakar29619@gmail.com', // Sender address
                to: 'sudhakar29619@gmail.com', // List of recipients
                subject: 'Hello from Node.js', // Subject line
                text: 'Hello !', // Plain text body
                html: '<b>Hello world!</b>' // HTML body
            };
            await sendEmail(mailOptions)
        // }
        await Member.updateOne({_id: member._id}, {lastTrigged: Date.now()})
    }
}



module.exports = {
    sendBulkMessages
}