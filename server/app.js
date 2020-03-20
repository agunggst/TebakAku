const express = require('express')
const app = express()
const socket = require('socket.io')
require('dotenv').config()
const cors = require('cors')

const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.get('/', (request, response) => {
    response.send('This Server is Running')
})

const server = app.listen(port, () => {
    console.log('This Server is Running on Port: ', port)
})

const io = socket(server)

module.exports = io