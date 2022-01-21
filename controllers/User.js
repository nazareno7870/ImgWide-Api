require('dotenv').config()
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.post('/createuser', async (request, response) => {
  try {
    const { body } = request
    const { username, name, password,secretAdmin } = body

    if(secretAdmin === process.env.ADMIN){
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
      followers:[],
      follows:[],
      picprof:'./imgs/profiles/profile-1.jpg',
      posts:[],
      likes:[]
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)}else{
      return response.status(401).json({error: 'invalid adminPass'})
    }
  } catch (error) {
    return response.status(401).json({error: 'invalid user'})
  }

  

  })
  
  module.exports = usersRouter