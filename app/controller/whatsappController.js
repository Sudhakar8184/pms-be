
const { startOfDay, endOfDay, isBefore, subDays } = require("date-fns");
const { calculateNextTriggedDate } = require("../../lib/utils");
const { sendMessages } = require("../services/whatsapp");
var mongoose = require('mongoose');
var MemberDrug = mongoose.model('MemberDrugs')


async function sendBulkMessages(req, res) {
    try {
         let memberDrugDetails
        if(req &&req?.params?.memberDrugId){
            memberDrugDetails = await MemberDrug.find({_id: req?.params?.memberDrugId}).populate('member').populate('drug')
        } else {
            memberDrugDetails = await MemberDrug.find({nextTrigged: {$gte: startOfDay(subDays(new Date(), 1)), $lt: endOfDay(new Date())}, isActive:1, deleteAt: null }).populate('member').populate('drug')

        }


    for (const memberDrug of memberDrugDetails) {
        if(memberDrug.member){
            const phoneNumber =  memberDrug.member.countryCode+memberDrug.member.phoneNumber+'@s.whatsapp.net';
            const message = `Hello ${memberDrug.member.firstName}, How are you,\n \nThis Drug(${memberDrug.drug.labelName}) needs refilling on next 3 day `; // Message to send
            try {
                const result = await sendMessages(phoneNumber, message, req?.params?.memberDrugId); // Send message to each recipient
                // let days =  memberDrug.days > 3 ? memberDrug.days-3 : memberDrug.days;
                if(result.success) {
                    let nextTrigged
                    if(req && req?.params?.memberDrugId){
                        nextTrigged  = calculateNextTriggedDate(new Date(), memberDrug.days)
                    } else {
                        nextTrigged  = calculateNextTriggedDate(memberDrug.nextTrigged, memberDrug.days)
                    }
                   
                    if(isBefore(nextTrigged, memberDrug.endValue)){
                        let triggerCount = memberDrug.triggerCount ? memberDrug.triggerCount+1 : 1
                        await MemberDrug.updateOne({_id: memberDrug._id}, {lastTrigged: Date.now(), nextTrigged, triggerCount})   
                    }
                } 
                // else if(result.error){
                //     if(req.params.memberDrugId){
                //         throw new Error(JSON.stringify(result.error);
                //     }
                // }
               
            } catch (error) {
                   console.error(`Error sending message to ${JSON.stringify(memberDrug)}:`, error);
                    if(req && req?.params?.memberDrugId){
                        throw error.response.data.error || error
                    }
            }
              
        }
    }
   } catch(err){
      console.log(err)
      throw err
   }
     
}

module.exports = {
    sendBulkMessages
}