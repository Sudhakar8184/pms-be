const express = require('express');
const cors = require('cors');
require('dotenv').config()
const bodyparser = require('body-parser');
const router = require('./router/index');
require('./config/db')
const app = express();
const port = 3000;
app.use(cors())
app.use(bodyparser())
app.use('/api',router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
