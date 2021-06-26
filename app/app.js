const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const userRoutes = require('../src/routes/routes')

const app = express()
const port = 3000 

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.once('open', () => { 
    console.log('Connected!')
})

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Api Is Working!'))

app.use('/api', userRoutes)

app.listen(port, () => console.log(`App Running on http://localhost:${port}`))