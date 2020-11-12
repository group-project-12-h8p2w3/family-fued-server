const express = require('express')
const app = express()
const PORT = 3000

const cors = require('cors') 

const router = require('./routes/')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use(router)

app.listen(PORT, _ => {
    console.log(`running at http://localhost:${PORT}`)
})
