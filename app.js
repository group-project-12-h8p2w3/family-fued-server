const express = require('express')
const app = express()
const PORT = 3000
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors') 
const { Question, Answer, Sequelize } = require('./models/')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

let userLogin = []
let messages = []
let questions = []
let answers = []
let thisRoundAnswer = []
let time = 20
let gameStart = false

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('login', (user) => {
        userLogin.push(user)
        io.emit('userLogin', userLogin)
    })

    socket.on('enterGame', () => {
        if(!gameStart) {
            io.emit('gameStart', gameStart)
            gameStart = true
            const data = userLogin.map(el => {
                const scoreboard = {
                    username: el,
                    score: 0
                }
                return scoreboard
            })
            userLogin = []
            io.emit('fetchEnteredUser', data)
        } else {
            io.emit('gameStart', gameStart)
        }
    })

    socket.on('finish', () => {
        gameStart = false
        io.emit('gameStart', gameStart)
    })
    
    socket.on('fetchQuestion', () => {
        const option = {
            include: Answer,
            order: [Sequelize.fn('random')], limit: 5

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

    socket.on('compareAnswer', (payload) => {
        let isTrue = false
<<<<<<< HEAD
        let id
        console.log(thisRoundAnswer)
=======
        let index
>>>>>>> 896d29d2e45b52db8dd890b1527a6de84994defb
        for (let i = 0; i < thisRoundAnswer.length; i++) {
            const answer = thisRoundAnswer[i].answer.toLowerCase()
            const thisId = thisRoundAnswer[i].id
            if (answer === payload.answer.toLowerCase()) {
                isTrue = true
                id = thisId
                thisRoundAnswer.splice(i, 1)
            }
        }
        const data = {
            isTrue, id,
            user: payload.user
        }
        const message = {
            isTrue,
            answer: payload.answer,
            user: payload.user
        }
        messages.unshift(message)
        io.emit('messages', messages)
        io.emit('compareAnswer', data)
    })

    socket.on('timer', () => {
        time -= 1;
        io.emit('fetchTime', time)
    })

    socket.on('resetTimer', () => {
        io.emit('fetchTime', time)
    })

    socket.on('getQuestion', ()=> {
        if(questions.length){
            const question = questions.pop()
            const answer = answers.pop()
            thisRoundAnswer = answer
            io.emit('questionsList', {question, answer})
        }
        else {
            const question = ''
            const answer = ''
            io.emit('questionsList', {question, answer})
        }
    })
})

http.listen(PORT, _ => {
    console.log(`running at http://localhost:${PORT}`)
})
