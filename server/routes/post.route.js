const express = require("express");
const Post = require("../models/post.model.js");
const router = express.Router();
const {getPosts, getPost, createPost, updatePost, deletePost} = require('../controllers/post.controller.js');

// get all blog posts
router.get('/', getPosts);

// get only one post
router.get("/:id", getPost);

// create post
router.post("/", createPost);

// update a post
router.put("/:id", updatePost);

// delete a post
router.delete("/:id", deletePost);




module.exports = router;