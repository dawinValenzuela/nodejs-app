const fs = require('fs');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(express.json());

app.use(cors());

const posts = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/posts.json`)
);

app.get('/api/v1/posts', (req, res) => {
    res.status(200).json({
        status: 'success',
        ...posts
    });
});

app.post('/api/v1/posts',(req, res) => {
    const children = posts.data.children;

    const newId = children[children.length  -1].data.id + 1;
    
    const newPost = {
        kind: "t3",
        data: {
            id: newId,
            ...req.body
        }
    };
    children.push(newPost);
    posts.data.children = children;

    fs.writeFile(`${__dirname}/dev-data/data/posts.json`, JSON.stringify(posts), err => {
        res.status(201).json({
            status: 'success',
            data: {
                post: newPost
            }
        })
    });
});

app.get('/api/v1/posts/:id', (req, res) => {
    const children = posts.data.children;
    const post = children.find(el => el.data.id === req.params.id);

    if(!post) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }

    res.status(200).json({
        status: 'success',
        post
    });
});

app.patch('/api/v1/posts/:id', (req, res) => {
    const children = posts.data.children;
    const post = children.find(el => el.data.id === req.params.id);

    if(!post) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }
    
    res.status(200).json({
        status: 'success',
        post
    })
});

app.delete('/api/v1/posts/:id', (req, res) => {
    const children = posts.data.children;
    const post = children.find(el => el.data.id === req.params.id);

    if(!post) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }
    
    res.status(204).json({
        status: 'success'
    });
});

const port = 4000;

app.listen(port, () => {
    console.log(`App running on port ${port}`)
});