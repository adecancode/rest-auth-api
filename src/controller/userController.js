const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const User = require('../models/user')
require('dotenv').config()


exports.getUsers = async function (req, res) {
    const getUsers = await User.find()

    res.json(getUsers)
}

exports.register = async function (req, res) {
    try{
        let { username, email, password } = req.body

        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(302).send("User exists. Please login!")
        }

        const hashPassword = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username: username,
            email: email,
            password: hashPassword
        })

        const userToken = await jwt.sign({ id: user._id, email }, process.env.JWT)
        user.token = userToken

        const saveUser = user.save()

        console.log(saveUser)
        res.status(201).send({ message: "Your account has been created successfully!" })
    } 
    catch(err) {
        res.status(422).send({ message: "An Error Occured!" })
    }
}

exports.login = async function (req, res) {
    try{
        let { username, password, email } = req.body
        const user = await User.findOne({ username: username })
        if (!user) return res.status(400).send("Invalid email or password / User not registered!");

        const match = await bcrypt.compare(password, user.password)
        const userToken = await jwt.sign({ id: user._id, email }, process.env.JWT)
        if(match){
            user.token = userToken
            res.status(200).send({ message: "Login Successful!" })
        }
        else {
            res.status(422).send({ message: "An Error Occured!" })
        }
    }
    catch(err) {
        res.status(422).send({ message: "An Error Occured!" })
        console.log(err)
    }
}
