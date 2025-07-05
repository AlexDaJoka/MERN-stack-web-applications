//ENV
require('dotenv').config()


// Express, path
const express = require('express');
const app = express();
const path = require('path')

// Mongodb connection
const Dbconnect = require('./config/DBconnection.js')


//Cors
const cors = require('cors')
const corsOprion = require('./config/corsOption')

const cookie = require('cookie-parser');


// socket.io
const http = require('http')
const {Server} = require('socket.io');




Dbconnect()


app.use(cors());
app.use(cors(corsOprion));

app.use(cookie())


app.use(express.json())


app.use('/users', require('./routes/userRouter.js'))


app.use('/events', require('./routes/eventsRouter.js'))


app.use('/auth', require('./routes/authRouter.js'))


app.use('/messages', require('./routes/messagerRouter.js'))



const PORT = 8000
app.listen(PORT, () => {
console.log(`Сервер работает на порте ${PORT}`)
})