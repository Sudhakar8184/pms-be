
const { startOfDay, endOfDay } = require("date-fns");
const { calculateNextTriggedDate } = require("../../lib/utils");
const { sendMessages } = require("../services/whatsapp");
var mongoose = require('mongoose');
var MemberDrug = mongoose.model('MemberDrugs')


async function sendBulkMessages() {
    try {
    const memberDrugDetails = await MemberDrug.find({nextTrigged: {$gte: startOfDay(new Date()), $lt: endOfDay(new Date())}, isActive:1, deleteAt: null }).populate('member').populate('drug')

    for (const memberDrug of memberDrugDetails) {
        if(memberDrug.member){
            const phoneNumber =  memberDrug.member.countryCode+memberDrug.member.phoneNumber+'@s.whatsapp.net';
            const message = `Hello ${memberDrug.member.firstName}, How are you,\n \nThis Drug(${memberDrug.drug.labelName}) needs refilling on next 3 day `; // Message to send
            try {
                await sendMessages(phoneNumber, message); // Send message to each recipient
                // let days =  memberDrug.days > 3 ? memberDrug.days-3 : memberDrug.days;
                let nextTrigged = calculateNextTriggedDate(memberDrug.nextTrigged, memberDrug.days)
                let triggerCount = memberDrug.triggerCount ? memberDrug.triggerCount : 1
                await MemberDrug.updateOne({_id: memberDrug._id}, {lastTrigged: Date.now(), nextTrigged, triggerCount})   
            } catch (error) {
                   console.error(`Error sending message to ${JSON.stringify(memberDrug)}:`, error);
            }
              
        }
    }
   } catch(err){
      console.log(err)
   }
     
}



module.exports = {
    sendBulkMessages
}