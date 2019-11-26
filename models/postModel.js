const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  author: {
    type: String,
    required: [true, "Author is required"]
  },
  thumbnail: String,
  num_comments: Number,
  visited: {
    type: Boolean,
    default: false
  },
  created: {
    type: Number
  },
});

postSchema.pre("save", function(next) {
  this.created = new Date().getTime()/1000;
  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
