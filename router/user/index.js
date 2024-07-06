const router = require('express').Router();
const { loginHandler, registerHandler } = require('./userHandler');

router.post('/register', registerHandler )
router.post('/login', loginHandler )

module.exports = router