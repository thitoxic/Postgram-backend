const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());
app.use(cors())

const posts = []

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    switch (type) {
        case 'PostCreated':
            const { title } = data;
            posts.push({ id : data.id, title, comments: []})
            break;
        case 'CommentCreated':
            const { id, content, postId } = data;
            posts.map((post)=>{
                if(data.postId === post.id){
                    post.comments.push({ id, content })
                }
            })
    }

    res.send({})

    console.log('posts', posts)

})

app.listen(4002, ()=> {
    console.log('query is listening on 4002');
})
