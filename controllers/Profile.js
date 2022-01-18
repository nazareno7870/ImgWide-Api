const profileRouter = require('express').Router()
const User = require('../models/User')

profileRouter.post('/',async(request,response)=>{
    const {body} = request
    const {id} = body
    const userPosts = await User.findById(id).populate({path:'posts',populate:{path:'userId'},options:{sort:{date:-1}}})
    response.status(201).json(userPosts.posts)
})

module.exports = profileRouter