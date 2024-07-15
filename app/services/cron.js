const cron =  require('node-cron');
const { sendBulkMessages } = require('../controller/whatsappController');

const job = cron.schedule('12 11 * * *', async() => {
    console.log('cron job started...')
    console.log(new Date())
    await sendBulkMessages()
    console.log('cron job ended...')
});

job.start();