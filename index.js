const express = require('express');
const cors = require('cors');
const usersRouter = require('./controllers/User');
const app = express();
const handleErrors = require('./middleware/handleErrors.js');
const postsRouter = require('./controllers/Posts');
const tagsRouter = require('./controllers/Tags');
const path = require('path');

app.use(cors())
app.use(express.json())


app.use('api/users',usersRouter)
app.use('api/posts',postsRouter)
app.use('api/tags',tagsRouter)
app.use('/',express.static('../app/dist'))
app.use('/imgs',express.static('imgs'))



app.use(handleErrors)


app.listen(3001)
