const profileRouter = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')

profileRouter.get('/username=:username',async (request,response)=>{
    try {
        const username = request.params.username
        const usernameBd = await User.findOne({username})
        if(usernameBd){
        response.status(201).json(usernameBd)
        }else{
            response.status(401).json({})
        }
    } catch (error) {
        response.status(401).json({})

    }

})

profileRouter.get('/profile=:profile&limit=:limit&skip=:skip',async (request,response)=>{
    try {
        const limit = request.params.limit
        const skip = request.params.skip
        const profile = request.params.profile
        const usernameBd = await User.findOne({username:profile})
        if(usernameBd){
            const userId = usernameBd.id
            const profileBd = await Post.find({userId}).populate('userId','username').sort({date:'desc'}).limit(limit).skip(skip)
            response.status(201).json(profileBd)
        }else{
            response.status(401).json({})
        }
    
    } catch (error) {
        response.status(401).json({})

    }

})




module.exports = profileRouter