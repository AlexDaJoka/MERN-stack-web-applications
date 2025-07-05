require('dotenv').config()

const express = require('express');
const app = express();


const {Server} = require('socket.io');
const http = require('http');

const cors = require('cors');
const corsOprion = require('./config/corsOptions');
const Dbconnect = require('./config/DBconnection.js');
const cookie = require('cookie-parser');



Dbconnect()


app.use(cors());
app.use(cors(corsOprion));
app.use(cookie())
app.use(express.json())

app.use('/users', require('./routes/UserRouter.js'))
app.use('/auth', require('./routes/AuthRouter.js'))
app.use('/messages', require('./routes/MessageRouter.js'))


const server = http.createServer(app);


const io = new Server(server, {
cors: {
    origin: "*",
    methods: ["GET", "POST"],
},
})

io.on("connection", (socket) => {

    socket.on("join", ({name, room}) => {
        socket.join(room);

        socket.emit('message', {
            data: {user: {name: "Admin"}, message: `fuck you nigga ${name}`}
        })
    });

    io.on("disconnect", () => {
        console.log('Disconnect');
      });
  });

const PORT = 8000;
server.listen(PORT, () => {
console.log(`server is running on port ${PORT}`);
})