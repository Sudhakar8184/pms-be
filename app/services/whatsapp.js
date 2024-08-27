const axios = require('axios')
async function sendMessages(to, message, memberDrugId) {
    try {
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`
            }
          };
          
        await  axios.post('https://gate.whapi.cloud/messages/text',{to: to, body: message, typing_time:0}, options);
        console.log('Message sent successfully');
        return {
            success: true
        }
    } catch (error) {
        console.error('Error in sending message:', error);
        if(memberDrugId){
            throw error
        }
    }
}


module.exports = {
    sendMessages
}