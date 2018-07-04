import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Food', 'Lifestyle', 'Tech']
    },
    userId: {
        type: String,
        required: true,
    },
    textContent: {
        type: String,
        trim: true,
    },
    mediaUrl: {
        type: String,
        trim: true,
    },
    locked: {
        type: Number,
    }
});

const Post = mongoose.model('Post', PostSchema);
export default Post;