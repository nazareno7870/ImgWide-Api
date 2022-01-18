const postsRouter = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: '../app/public/imgs/posts',
    filename: function (req, file, cb) {
      cb(null, Date.now() + (Math.floor(Math.random() * 999999999)).toString()+ path.extname(file.originalname)) //Appending extension
    }
  })
  
const upload = multer({ storage: storage });

postsRouter.post('/',async(request,response)=>{
    const posts = await Post.find({}).populate('userId')
    response.status(201).json(posts)

})

postsRouter.post('/createpost',upload.single('file'),async(request,response)=>{
    try {
        const {body} = request
        const img = './imgs/posts/' + request.file.filename
        const {content,userId, username} = body
        const newPost = new Post({
            date: new Date().toISOString(),
            content,
            img,
            likesId:[],
            userId,
            username
        })

        const savedPost = await newPost.save()
        const prevUser = await User.findById(userId)
        const postsUser = prevUser.posts.concat(savedPost._id)
        await User.findByIdAndUpdate(userId,{"posts":postsUser}, { new: true })
        response.status(201).json(savedPost)

    } catch (error) {
        response.status(401).json("No se pudo guardar el post")
    }
 
})


module.exports = postsRouter