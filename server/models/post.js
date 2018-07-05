import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    // createdOn: {
    //     type: Date,
    // },
    category: {
        type: String,
        required: true,
        enum: ['Food', 'Lifestyle', 'Tech']
    },
    score: {
        type: Number
    },
    userId: {
        type: String,
        required: true,
    },
    textContent: {
        type: String,
        trim: true,
    },
    mediaContent: {
        type: String,
        trim: true,
    },
    locked: {
        type: Number,
    }
});

const Post = mongoose.model('Post', PostSchema);
export default Post;