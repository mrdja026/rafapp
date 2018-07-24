import mongoose from 'mongoose';
import moment from 'moment';
import Comment, { CommentSchema } from './comment';
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    createdOn: {
        type: Number,
    },
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
    mediaContentThumb: {
        type: String,
        trim: true,
    },
    locked: {
        type: Number,
    },
    comments: [],

});

PostSchema.pre('save', function (next) {
    let post = this;
    post.createdOn = moment().valueOf();
    next();
})

const Post = mongoose.model('Post', PostSchema);
export default Post;