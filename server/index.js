const http = require('http')
const express = require('express')
const cors = require('cors')
const socketIO = require('socket.io')

const app = express();
const port = 4500 || process.env.PORT

app.use(cors());
//api routes
app.get('/', (req, res) => {
    res.send('get route was accesed')
})
const server = http.createServer(app);

const io = socketIO(server);
io.on('connection', () => {
    console.log('CONNECTION ESTABLISHED')
})

server.listen(port, () => {
    console.log(`Listening on port no http://localhost:${port}`)
})