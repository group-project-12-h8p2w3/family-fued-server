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
let questions = []
let answers = []
let thisRoundAnswer = []
let answered = []

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('login', (user) => {
        userLogin.push(user)
        io.emit('userLogin', userLogin)
    })

    socket.on('enterGame', () => {
        const data = userLogin.map(el => {
            const scoreboard = {
                username: el,
                score: 0
            }
            return scoreboard
        })
        userLogin = []
        io.emit('fetchEnteredUser', data)
    })

    socket.on('fetchQuestion', () => {
        const option = {
            include: Answer
        }
        Question.findAll(option)
            .then(data => {
                questions = data.map(el => {
                    return el.question
                })
                answers = data.map(el => {
                    return el.Answers
                })
                const question = questions.pop()
                const answer = answers.pop()
                thisRoundAnswer = answer
                console.log(answers)
                io.emit('questionsList', {question, answer})
            })
            .catch(err => {
                console.log(err)
            })
    })

    socket.on('getQuestion', () => {
        const question = questions.pop()
        const answer = answers.pop()
        io.emit('questionsList', {question, answer})
    })

    socket.on('compareAnswer', (payload) => {
        let isTrue = false
        let index
        console.log(thisRoundAnswer)
        for (let i = 0; i < thisRoundAnswer.length; i++) {
            const answer = thisRoundAnswer[i].answer
            if (answer === payload.answer) {
                isTrue = true
                index = i
                answers.splice(i, 1)
            }
        }
        const data = {
            isTrue, index,
            user: payload.user
        }
        io.emit('compareAnswer', data)
    })

    socket.on('sendMessage', (msg) => {
        messages.push(msg)
        io.emit('messages', messages)
    })
})

http.listen(PORT, _ => {
    console.log(`running at http://localhost:${PORT}`)
})
