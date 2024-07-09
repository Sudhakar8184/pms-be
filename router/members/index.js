const router = require('express').Router();
const multer = require('multer');
const { addMemberOnFileHandler, addMemberHandler, sendMemberMessageHandler, addDrugOnFileHandler, getDrugListHandler, getMemberHandler, getNotificationListHandler } = require('./memberHandler');
const { auth } = require('../../app/services/middleware');
const upload = multer({ dest: 'uploads/' });
router.get('/send-member-message', sendMemberMessageHandler )

router.use(auth)
router.post('/add-member-file', upload.single('excelFile'), addMemberOnFileHandler )
router.post('/add-drug-file', upload.single('excelFile'), addDrugOnFileHandler )

router.post('/add-member', addMemberHandler )

router.get('/get-member', getMemberHandler )

router.get('/get-drug-list', getDrugListHandler )
router.get('/get-notification-list', getNotificationListHandler )
module.exports = router