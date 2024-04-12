const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title! "],
    },

    content: {
      type: String,
      required: false
    },

    author: {
      type: String,
      required: false
    },

    creationDate: { 
      type: Date, 
      default: Date.now }
  },
  {
    timestamps: true,
  }
);


const Post = mongoose.model("Post", PostSchema);

module.exports = Post;