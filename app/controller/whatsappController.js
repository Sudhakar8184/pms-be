const { sendEmail } = require("../services/email");
const { sendMessages } = require("../services/whatsapp");
var mongoose = require('mongoose');
var Member = mongoose.model('Members')
var MemberDurg = mongoose.model('MemberDurgs')


async function sendBulkMessages() {
    // let memberDetails = await Member.find({ lastTrigged: null });
    const memberDurgDetails = await MemberDurg.find({lastTrigged: null}).populate('membersId').populate('durgId')

   
    
    for (const memberDurg of memberDurgDetails) {
        if(memberDurg.membersId){
            const phoneNumber =  memberDurg.membersId.phoneNumber+'@s.whatsapp.net';
            const message = `Hello ${memberDurg.membersId.firstName}, How are you,\n \nThis Durg(${memberDurg.durgId.labelName}) needs refilling on next 3 day `; // Message to send
            try {
                await sendMessages(phoneNumber, message); // Send message to each recipient
            } catch (error) {
                   console.error(`Error sending message to ${recipient}:`, error);
            }
            // if(member.email) {
                // let mailOptions = {
                //     from: 'sudhakar29619@gmail.com', // Sender address
                //     to: 'sudhakar29619@gmail.com', // List of recipients
                //     subject: 'Hello from Node.js', // Subject line
                //     text: 'Hello !', // Plain text body
                //     html: '<b>Hello world!</b>' // HTML body
                // };
                // await sendEmail(mailOptions)
            // }
            await MemberDurg.updateOne({_id: memberDurg._id}, {lastTrigged: Date.now()})        }
       
    }
}



module.exports = {
    sendBulkMessages
}