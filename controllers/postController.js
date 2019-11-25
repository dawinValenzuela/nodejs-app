const fs = require('fs');

const posts = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/posts.json`)
);

exports.checkID = (req, res, next, val) => {
    next();
}

exports.getAllPosts = (req, res) => {
    res.status(200).json({
        status: 'success',
        ...posts
    });
}

exports.getPost = (req, res) => {
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

exports.createPost = (req, res) => {
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

exports.updatePost = (req, res) => {
    const children = posts.data.children;
    const post = children.find(el => el.data.id === req.params.id);

    //console.log(post);

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

exports.deletePost = (req, res) => {
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
