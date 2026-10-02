const Post = require("../models/post");

const isAuthorizedToComment = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json("post not found");
        }
        const comment = post.comments.id(req.params.commentId);

        if (comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json("you are not authorized to view or modify this comment");
        }
        next();
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}
module.exports = isAuthorizedToComment 