const Post = require("../models/post")

const createComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json("post is not found")
        }
        post.comments.push({ ...req.body, owner: req.user._id, post: req.params.postId });
        await post.save();
        res.status(201).json(post.comments[post.comments.length - 1]);
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}

const updateComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        const comment = post.comments.id(req.params.commentId)

        comment.title = req.body.title;
        comment.content = req.body.content;

        await post.save();
        res.status(200).json(comment);
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}

const deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        const deletedcomment = post.comments.pull(req.params.commentId)
        await post.save();
        res.status(200).json(deletedcomment);
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}
module.exports = { createComment, updateComment, deleteComment }