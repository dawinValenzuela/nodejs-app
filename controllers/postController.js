const Post = require("../models/postModel");
const APIFeatures = require("../utils/apiFeatures");

/*
const posts = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/posts.json`)
);
*/
exports.getAllPosts = async (req, res) => {
  
  const allPost = await Post.find({});

  const features = new APIFeatures(Post.find(), req.query).paginate();
  const posts = await features.query;

  res.status(200).json({
    status: "success",
    total: allPost.length,
    totalPages: Math.ceil((allPost.length / req.query.limit) * 1),
    data: {
      posts
    }
  });
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        post
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        post: newPost
      }
    });
  } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err
      });
  }
};

exports.updatePost = (req, res) => {
  const children = posts.data.children;
  const post = children.find(el => el.data.id === req.params.id);

  //console.log(post);

  if (!post) {
    res.status(404).json({
      status: "fail",
      message: "Invalid Id"
    });
  }

  res.status(200).json({
    status: "success",
    post
  });
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
          });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
          });
    }
};
