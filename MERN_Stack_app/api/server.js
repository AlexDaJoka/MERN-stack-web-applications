require('dotenv').config()

const express = require('express');
const app = express();
const DBconnect = require('./config/DB_Config')

const cors = require('cors')
const corsOption = require('./config/corsOption')

const cookie = require('cookie-parser')



DBconnect()

app.use(cors())

app.use(cors(corsOption))

app.use(cookie())

app.use(express.json())



app.use('/auth', require('./routes/authRoutes.js'));

app.use('/post', require('./routes/postRoutes.js'));

app.use('/users', require('./routes/userRouter.js'));



const PORT = 8000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})