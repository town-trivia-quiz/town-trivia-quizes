if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes')
const port = process.env.PORT || 3000
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)

io.on('connection', (socket) => {
  console.log(`a user has been connected`)
  socket.on('replyMessage', (data) => {
    socket.broadcast.emit('sendAll', data)
  })

  socket.on('getWiner', (data) => {
    socket.broadcast.emit('gameEnd', data)
  })
})

http.listen(port, () => {
  console.log('App listen in http://localhost:' + 3000)
})
