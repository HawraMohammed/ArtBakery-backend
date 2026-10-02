const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    title: { type: String, required: true },
    content: { type: String, required: true }
}, {
    timestamps: { createdAt: true, updatedAt: false }
})

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
        type: String,
        enum: ['Birthday', 'Baby', 'Graduation', 'Weddiing', 'Gift', 'Corporate', 'Religious', 'Other']
        , required: true
    },
    images: [String],
    comments: [commentSchema]
}, { timestamps: { createdAt: true } })

const Post = mongoose.model('Post', postSchema);

module.exports = Post;