const express = require('express')
const app = express()
const PORT = 3000
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors') 
const { Question, Answer } = require('./models/')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

let userLogin = []
let messages = []

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('login', (user) => {
        userLogin.push(user)
        io.emit('userLogin', userLogin)
    })

    socket.on('fetchQuestion', () => {
        const data = Question.findAll()
        io.emit('questionsList', data)
    })

    socket.on('fetchAnswer', () => {
        const data = Answer.findAll()
        io.emit('answersList', data)
    })

    socket.on('sendMessage', (msg) => {
        messages.push(msg)
        io.emit('messages', messages)
    })
})

http.listen(PORT, _ => {
    console.log(`running at http://localhost:${PORT}`)
})
