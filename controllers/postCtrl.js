const Post = require("../models/post")

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
        res.status(200).json(posts)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
}
const getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json("post is not found")
        }
        res.status(200).json(post)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
}
const createPost = async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            images: Array.isArray(req.body.images)
                ? req.body.images
                : [req.body.images]
        });

        res.status(201).json(newPost)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
}
const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json("post is not found")
        }
        const updatedPost = await Post.findByIdAndUpdate(req.params.postId
            , {
                ...req.body,
                images: Array.isArray(req.body.images)
                    ? req.body.images
                    : [req.body.images]
            });

        res.status(200).json(updatedPost)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
}
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json("post is not found")
        }
        const deletedPost = await Post.findByIdAndDelete(req.params.postId);

        res.status(200).json(deletedPost)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
}
module.exports = { getAllPosts, getSinglePost, createPost, updatePost, deletePost }