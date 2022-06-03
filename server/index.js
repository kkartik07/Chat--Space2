const http = require('http')
const express = require('express')
const cors = require('cors')
const socketIO = require('socket.io')

const app = express();
const port = 4500 || process.env.PORT

const users = [{}];

app.use(cors());
//api routes
app.get('/', (req, res) => {
    res.send('get route was accesed')
})
const server = http.createServer(app);

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('CONNECTION ESTABLISHED');

    socket.on('joined', ({ user }) => {
        users[socket.id] = user;
        console.log(`${user} has joined! `);
        socket.broadcast.emit('userJoined', { user: "Admin", message: `${users[socket.id]} has joined the room!` })
        socket.emit('welcome', { user: "Admin", message: `Welcome to the chat, ${users[socket.id]}` })
    })

    socket.on('message', ({ message, id }) => {
        io.emit('sendMessage', { user: users[id], message: message, id: id })
    })

    // socket.on('disconnect', () => {
    //     socket.emit('leave', { user: users[id], message: `${users[socket.id]} has left the chat` });
    //     console.log('User has left the chat')
    // })
})

server.listen(port, () => {
    console.log(`Listening on port no http://localhost:${port}`)
})