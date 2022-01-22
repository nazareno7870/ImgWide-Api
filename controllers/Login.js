require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
    const { body } = request
    const { username, password } = body
  
    const user = await User.findOne({ username })
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)
  
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid user or password'
      })
    }
  
    const userForToken = {
      id: user._id,
      username: user.username
    }
  
    const token = jwt.sign(
      userForToken,
      process.env.SECRET,
      {
        expiresIn: 60 * 60 * 24 * 7
      }
    )
  
    response.send({
      id:user.id,
      name: user.name,
      username: user.username,
      followers: user.followers,
      follows: user.follows,
      picprof: user.picprof,
      posts: user.posts,
      likes: user.likes,
      token
    })
  })
  
  loginRouter.post('/exist', async (request, response) => {
    const { body } = request
    const { username, token } = body
    if(username === null || token === null || username === 'undefined'){

      return response.status(401).json({
        error: 'invalid username or token'
      })
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'invalid username or token' })
    }
  
    const { username: userdecod} = decodedToken

    if(username === userdecod){
      const user = await User.findOne({ username })
  
      response.send({
        id:user.id,
        name: user.name,
        username: user.username,
        followers: user.followers,
        follows: user.follows,
        picprof: user.picprof,
        posts: user.posts,
        likes: user.likes,
        token
      })
    }else{
      return response.status(401).json({ error: 'invalid username or token' })
    }


    
  })
  
  module.exports = loginRouter