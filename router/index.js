const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const memberHandler = require('./members/index')
router.get('/', (req, res)=>{
res.send("working.....")
})

router.use('/member', memberHandler)


module.exports = router