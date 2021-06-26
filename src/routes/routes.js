const express = require('express')
const userController = require('../controller/userController')

const router = express.Router()

router.get('/users', userController.getUsers)

router.post('/register', userController.register)

router.post('/login', userController.login)

router.patch('/update/:id', userController.update)

module.exports = router