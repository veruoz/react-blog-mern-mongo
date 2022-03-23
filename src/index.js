import mongoose from "mongoose";
import PostModel from './models/Post'
// // позволяет читать данные через метод post
import bodyParser from "body-parser";
import express from "express";

const app = express()

mongoose.connect('mongodb+srv://user_01:NTYJ56eew@cluster0.ur1r9.mongodb.net/node-blog?retryWrites=true&w=majority')
    .then((res) => console.log('Connected'))
    .catch((error) => console.log(error))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// // маршрут
app.post('/posts', (req, res) => {

    const data = req.body

    const post = new PostModel({
        title: data.title,
        text: data.text
    })

    post.save().then(() => {
        res.send({status: 'ok'})
    })
})

app.get('/posts', (req, res) => {
    PostModel.find().then((err, posts) => {
        if (err) {
            return res.send(err)
        }
        res.json(posts)
    })
})

app.delete('/posts/:id', (req, res) => {
    PostModel.remove({
        _id: req.params.id
    }).then(post => {
        if(post) {
            res.json({status: 'deleted'})
        } else {
            res.json({status: 'error'})
        }
    })
})

app.put('/posts/:id', (req, res) => {
    PostModel.findByIdAndUpdate(req.params.id, {$set: req.body}, err => {
        if(err) {
            res.send(err)
        }
        res.json({status: 'updated'})
    })
})


// локальный путь http://localhost:333/posts
app.listen(333, function () {
    console.log('Server started')
})
