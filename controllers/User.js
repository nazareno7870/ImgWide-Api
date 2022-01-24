require('dotenv').config()
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')
const sendEmail = require('../email/email.send')
const templates = require('../email/email.templates')

usersRouter.post('/createuser', async (request, response) => {

  try {
    const { body } = request
    const { username, password, email} = body

    const verUser = await User.find({email})

    if(verUser.email){
    return response.status(401).json({error: 'Email already used'})

    }
        
    if(username.length<6 || password.length<8){
      return response.status(401).json({error: 'invalid user'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      passwordHash,
      followers:[],
      follows:[],
      picprof:'',
      grade:'user',
      posts:[],
      likes:[],
      email
    })

    const savedUser = await user.save()

    await sendEmail(savedUser.email, templates.confirm(savedUser._id) )

    response.status(201).json(savedUser)

  } catch (error) {
    return response.status(401).json({error: 'Email already used'})
  }
   



  })
  
  module.exports = usersRouter