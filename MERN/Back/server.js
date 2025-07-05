require('dotenv').config()

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Dbconnect = require('./config/Dbconnect');


const cors = require('cors')
const corsOption = require('./config/corsOprion');
const cookieParser = require('cookie-parser');
const { log } = require('util');


app.use(cors());
app.use(cors(corsOption))

app.use(cookieParser());




Dbconnect()

app.use(express.json())

// Get router
app.use('/', require('./routes/root.js'));

// User router
app.use('/users', require('./routes/userRoutes.js'));

// Products router
app.use('/products', require('./routes/productRouter'));


app.all('*', (req, res) =>{
        res.sendFile(path.join(__dirname, 'views', '404.html'));
        console.log(req.method)
        console.log(req.path)
})


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})