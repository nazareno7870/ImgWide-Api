const tagsRouter = require('express').Router()
const Tag = require('../models/Tag')
const Post = require('../models/Post')

tagsRouter.post('/tag',async (request,response)=>{
    try {
        const {body} = request
        const {tag} = body
        const newTag = new Tag({
            tag
        })
        const NewTag = await newTag.save()
        response.status(201).json(NewTag)
    } catch (error) {
        response.status(401).json({})

    }


})

tagsRouter.get('/all',async (request,response)=>{
    try {
        const allTags = await Tag.find({}).sort({tag:'asc'})
        response.send(allTags)
    } catch (error) {
        response.status(401).json({})
    }

})

tagsRouter.get('/tag/:tag&limit=:limit&skip=:skip',async (request,response)=>{
    try {
        const limit = request.params.limit
        const skip = request.params.skip
        const tag = request.params.tag
        const tagBd = await Post.find({tags:tag}).populate('userId').sort({date:'desc'}).limit(limit).skip(skip)
        response.status(201).json(tagBd)
    } catch (error) {
        response.status(401).json({})
    }

})

tagsRouter.get('/search/:search&limit=:limit&skip=:skip',async (request,response)=>{
    try {
        const limit = request.params.limit
        const skip = request.params.skip
        const search = request.params.search
        var regex = new RegExp(".*" + search + ".*", "i");
        const tagBd = await Post.find({tags:regex}).populate('userId').sort({date:'desc'}).limit(limit).skip(skip)
        response.status(201).json(tagBd)
    } catch (error) {
        response.status(401).json({})
    }

})



module.exports = tagsRouter