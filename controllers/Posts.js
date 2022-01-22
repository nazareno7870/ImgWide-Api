const postsRouter = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')
const Tag = require('../models/Tag')
const jwt = require('jsonwebtoken')


postsRouter.get('/limit=:limit&skip=:skip',async(request,response)=>{
    const limit = request.params.limit
    const skip = request.params.skip
    const posts = await Post.find({}).populate('userId').sort({date:'desc'}).limit(limit).skip(skip)
    response.status(201).json(posts)

})

postsRouter.post('/tag',async (request,response)=>{
    const {body} = request
    const {tag} = body
    const newTag = new Tag({
        tag
    })
    const NewTag = await newTag.save()
    response.status(201).json(NewTag)

})

postsRouter.get('/tag',async (request,response)=>{
    const tagBd = await Tag.findOne({tag:'asda'})
    console.log(tagBd)
    response.send(tagBd)
})

postsRouter.post('/createpost',async (request,response)=>{

    const authorization = request.get('authorization')
    let token = ''

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
      }
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }


    try {
        const {body} = request
        const {tags,userId, username,imgurl} = body
        const newPost = new Post({
            date: new Date().toISOString(),
            tags,
            imgSrc:imgurl,
            likesId:[],
            userId,
            username
        })

        tags.map(async tg=>{
            const tagBd = await Tag.findOne({tag:tg})

            if(tagBd === null){
                const newTag = new Tag({
                    tag:tg
                })
                const NewTag = await newTag.save()
            }
        })

        const savedPost = await newPost.save()
        const prevUser = await User.findById(userId)
        const postsUser = prevUser.posts.concat(savedPost._id)
        await User.findByIdAndUpdate(userId,{"posts":postsUser}, { new: true })
        
        tags.map(async tg=>{
            const tagBd = await Tag.findOne({tag:tg})
            const newPosts = tagBd.posts.concat(savedPost._id)
            await Tag.findOneAndUpdate({tag:tg},{"posts":newPosts})
        })

        response.status(201).json(savedPost)

    } catch (error) {
        response.status(401).json("No se pudo guardar el post")
    }
 
})


module.exports = postsRouter