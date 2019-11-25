const fs = require('fs');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    req.requestTime = new Date().getTime()/1000;
    next();
});

const posts = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/posts.json`)
);

// ROUTE HANDLERS
const getAllPosts = (req, res) => {
    res.status(200).json({
        status: 'success',
        ...posts
    });
}

const getPost = (req, res) => {
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
}

const createPost = (req, res) => {
    const children = posts.data.children;

    const newId = children[children.length  -1].data.id + 1;
    
    const newPost = {
        kind: "t3",
        data: {
            id: newId,
            visited: false,
            created: req.requestTime,
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
}

const updatePost = (req, res) => {
    const children = posts.data.children;
    const post = children.find(el => el.data.id === req.params.id);

    console.log(post);

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
}

const deletePost = (req, res) => {
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
}

// ROUTES
const postRouter = express.Router();
app.use('/api/v1/posts', postRouter);


postRouter
    .route('/')
    .get(getAllPosts)
    .post(createPost);

postRouter
    .route('/:id')
    .get(getPost)
    .patch(updatePost)
    .delete(deletePost)

const port = 4000;

//START SERVER
app.listen(port, () => {
    console.log(`App running on port ${port}`)
});