const tagsRouter = require('express').Router()
const Tag = require('../models/Tag')
const Post = require('../models/Post')

tagsRouter.post('/tag',async (request,response)=>{
    const {body} = request
    const {tag} = body
    const newTag = new Tag({
        tag
    })
    const NewTag = await newTag.save()
    response.status(201).json(NewTag)

})

tagsRouter.get('/all',async (request,response)=>{
    const allTags = await Tag.find({}).sort({tag:'asc'})
    response.send(allTags)
})

tagsRouter.get('/tag/:tag&limit=:limit&skip=:skip',async (request,response)=>{
    const limit = request.params.limit
    const skip = request.params.skip
    const tag = request.params.tag
    const tagBd = await Post.find({tags:tag}).sort({date:'desc'}).limit(limit).skip(skip)
    response.status(201).json(tagBd)
})


module.exports = tagsRouter