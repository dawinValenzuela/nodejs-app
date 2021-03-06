const Post = require("../models/postModel");
const APIFeatures = require("../utils/apiFeatures");

/*
const posts = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/posts.json`)
);
*/
exports.getAllPosts = async (req, res) => {
  let filter = {};

  const allPost = await Post.find();
  const features = new APIFeatures(Post.find(filter), req.query)
    .filter()
    .paginate();

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

exports.updatePost = async (req, res) => {
  console.log(req.body)

  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!post) {
    return next(new AppError('No post found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      post
    }
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
