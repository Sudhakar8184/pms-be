const router = require('express').Router();
const multer = require('multer');
const { addMemberOnFileHandler, addMemberHandler, sendMemberMessageHandler, addDurgOnFileHandler, getDurgListHandler, getMemberHandler } = require('./memberHandler');
const upload = multer({ dest: 'uploads/' });
router.post('/add-member-file', upload.single('excelFile'), addMemberOnFileHandler )
router.post('/add-durg-file', upload.single('excelFile'), addDurgOnFileHandler )

router.post('/add-member', addMemberHandler )

router.get('/get-member', getMemberHandler )
router.get('/send-member-message', sendMemberMessageHandler )

router.get('/get-durg-list', getDurgListHandler )
module.exports = router