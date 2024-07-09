const cron =  require('node-cron');
const { sendBulkMessages } = require('../controller/whatsappController');

const job = cron.schedule('52 8 * * *', async() => {
    console.log('cron job started...')
    await sendBulkMessages()
    console.log('cron job ended...')
});

job.start();