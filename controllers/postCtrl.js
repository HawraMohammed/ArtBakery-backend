const Post = require("../models/post")
const { cloudinary, uploadToCloudinary } = require('../config/cloudinary ')

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

        const images = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await uploadToCloudinary(file);

                images.push({
                    url: result.secure_url,
                    public_id: result.public_id
                });
            }
        }
        const newPost = await Post.create({
            ...req.body,
            images: images
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

        if (req.body.deletePictures) {
            let deletePictures = req.body.deletePictures;
            if (!Array.isArray(deletePictures)) {
                deletePictures = [deletePictures];
            }
            for (const publicId of deletePictures) {
                await cloudinary.uploader.destroy(publicId);
                post.images = post.images.filter(
                    picture => picture.public_id !== publicId
                );
            }

        }
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {

                const result = await uploadToCloudinary(file);

                post.images.push({
                    url: result.secure_url,
                    public_id: result.public_id
                });
            }
        }
        await post.save();
        const updatedPost = await Post.findByIdAndUpdate(req.params.postId,
            req.body
            , { new: true });

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
        if (post.images.length > 0) {
            for (const image of post.images) {
                await cloudinary.uploader.destroy(image.public_id);
            }
        }
        const deletedPost = await Post.findByIdAndDelete(req.params.postId);

        res.status(200).json(deletedPost)
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
}
module.exports = { getAllPosts, getSinglePost, createPost, updatePost, deletePost }