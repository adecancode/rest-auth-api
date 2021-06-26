const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Api Is Working!'))

app.listen(port, () => console.log(`App Running on http://localhost:${port}`))