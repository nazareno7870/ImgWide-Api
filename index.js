const express = require('express');
const cors = require('cors');
const usersRouter = require('./controllers/User');
const app = express();
const handleErrors = require('./middleware/handleErrors.js');
const postsRouter = require('./controllers/Posts');
const tagsRouter = require('./controllers/Tags');
const loginRouter = require('./controllers/Login');
const likeRouter = require('./controllers/Like');
const profileRouter = require('./controllers/Profile');
const emailController = require('./email/email.controller')

app.use(cors())
app.use(express.json())

app.get('/api/wake-up', (req, res) => res.json('👌'))
app.use('/api/users/',usersRouter)
app.use('/api/posts/',postsRouter)
app.use('/api/tags/',tagsRouter)
app.use('/api/login/',loginRouter)
app.use('/api/like',likeRouter)
app.use('/api/profile',profileRouter)
app.get('/api/email/confirm/:id', emailController.confirmEmail)
app.use('/',express.static('dist/'))
app.use('/imgs',express.static('imgs'))



app.use(handleErrors)


app.listen(process.env.PORT ||3001)
