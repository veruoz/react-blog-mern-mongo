import mongoose from "mongoose";
import PostController from './controllers/PostController'
const Post = new PostController()
// // позволяет читать данные через метод post
import bodyParser from "body-parser";
import express from "express";

const app = express()
mongoose.connect('mongodb+srv://user_01:NTYJ56eew@cluster0.ur1r9.mongodb.net/node-blog?retryWrites=true&w=majority')
    .then((res) => console.log('Connected'))
    .catch((error) => console.log(error))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// маршруты
app.get('/posts', Post.index)
app.post('/posts', Post.create)
app.get('/posts/:id', Post.read)
app.delete('/posts/:id', Post.delete)
app.put('/posts/:id', Post.update)


// локальный путь http://localhost:333/posts
app.listen(333, function () {
    console.log('Server started')
})
