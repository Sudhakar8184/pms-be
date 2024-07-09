const cron =  require('node-cron');
const { sendBulkMessages } = require('../controller/whatsappController');

const job = cron.schedule('* /5 * * *', async() => {
    console.log('cron job started...')
    await sendBulkMessages()
    console.log('cron job ended...')
});

job.start();