const router = require('express').Router();
const multer = require('multer');
const { addMemberOnFileHandler, addMemberHandler, sendMemberMessageHandler } = require('./memberHandler');
const upload = multer({ dest: 'uploads/' });
router.post('/add-member-file', upload.single('excelFile'), addMemberOnFileHandler )

router.post('/add-member', addMemberHandler )


router.get('/send-member-message', sendMemberMessageHandler )
module.exports = router