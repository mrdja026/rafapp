import express from 'express';
import { checkAuth, responseHeader } from '../utls/apiUtils';
import Post from '../models/post';

const SORT_CONDITION = '-createdOn'

const PostRouter = express.Router();

PostRouter.post('/getAll', checkAuth, responseHeader, (req, res, next) => {
    let { skip, take, category } = req.body;
    Post.find({ category: category }, null, { sort: SORT_CONDITION, skip: skip, limit: take }, (error, posts) => {
        if (error) {
            return next(error);
        } else {
            console.log('Posts to return', posts);
            res.send({ ok: true, items: posts });
        }
    })
});

PostRouter.post('/savePost', checkAuth, responseHeader, (req, res, next) => {
    let { title, textContent, userId, category } = req.body;
    console.log('New post to add ', title, ' ', textContent, ' ', userId, ' ', category);
    Post.create({ title: title, textContent: textContent, userId: userId, category: category }, (error, post) => {
        if (error) {
            console.log('Errorr', error);
            return next(error);
        } else {
            return res.send({ ok: true, post: post });
        }
    });
});



export default PostRouter;