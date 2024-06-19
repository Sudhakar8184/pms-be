const axios = require('axios')
async function sendMessages(to, message) {
    try {
        const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`
            }
          };
          
       return await  axios.post('https://gate.whapi.cloud/messages/text',{to: to, body: message, typing_time:0}, options);
        console.log('Message sent successfully');
    } catch (error) {
        console.error('Error in sending message:', error);
    }
}


module.exports = {
    sendMessages
}