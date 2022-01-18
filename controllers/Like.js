const likeRouter = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')

likeRouter.post('/', async (request,response)=>{
    const {body} = request;
    const {userId, postId} = body;
    const oldPost = await Post.findById(postId);
    const oldUser = await User.findById(userId);
    let userLikes = [];
    let postLikes = [];
    if(oldUser.likes.includes(postId)){
        postLikes = oldPost.likesId.filter(val => val !== userId)
        await Post.findByIdAndUpdate(postId,{likesId:postLikes})
        userLikes = oldUser.likes.filter(val => val !== postId)
        await User.findByIdAndUpdate(userId,{likes:userLikes})
    }else{
        postLikes = oldPost.likesId.concat(userId)
        await Post.findByIdAndUpdate(postId,{likesId:postLikes})
        userLikes = oldUser.likes.concat(postId)
        await User.findByIdAndUpdate(userId,{likes:userLikes})
    }
    
    response.status(201).end()
})

module.exports = likeRouter