import express from 'express';
import { checkAuth, responseHeader, HTTP_RA_EXCEPTION } from '../utls/apiUtils';
import Post from '../models/post';
import { generalUpload } from '../utls/cloudinaryUtils';
import Comment from '../models/comment';

const SORT_CONDITION = '-createdOn'

const PostRouter = express.Router();

PostRouter.post('/getAll', checkAuth, responseHeader, (req, res, next) => {
    let { skip, take, category } = req.body;
    Post.find({ category: category }, null, { sort: SORT_CONDITION, skip: skip, limit: take }, (error, posts) => {
        if (error) {
            return next(error);
        } else {
            console.log('Posts to return', posts);
            return res.send({ ok: true, items: posts });
        }
    })
});

PostRouter.post('/getById', checkAuth, responseHeader, (req, res, next) => {
    let { id } = req.body;
    Post.findById(id, (error, post) => {
        if (error) {
            return nex(error);
        } else if (!post) {
            let error = new Error('Post not found');
            error.status = HTTP_RA_EXCEPTION;
            return next(error);
        } else {
            Comment.find({ topicId: post._id }, null, { sort: SORT_CONDITION }, (error, comments) => {
                if (error) {
                    return next(error);
                } else {
                    post.comments = [...comments];
                    return res.send({ ok: true, post: post });
                }
            })
        }
    });
});

PostRouter.post('/savePost', checkAuth, responseHeader, (req, res, next) => {
    let { title, textContent, userId, category, mediaContent } = req.body;
    console.log('New post to add ', title, ' ', textContent, ' ', userId, ' ', category, ' ', mediaContent);
    Post.create({ title: title, textContent: textContent, userId: userId, category: category }, (error, post) => {
        if (error) {
            console.log('Errorr', error);
            return next(error);
        } else {
            if (mediaContent) {
                let { b64, type } = mediaContent;
                let base64String = 'data:' + type + ';base64,' + b64;
                generalUpload(base64String).then(result => {
                    console.log('Post media result', result);
                    Post.findOneAndUpdate({ _id: post._id }, { mediaContent: result.url }, { new: true, owerWrite: false }, (error, post) => {
                        if (error) {
                            return next(error);
                        } else {
                            console.log('ja sam snimio sa mediom???', post);
                            return res.send({ ok: true, post: post });
                        }
                    })
                }).catch(error => {
                    console.log('Failed to media content to post', error);
                })
            } else {
                return res.send({ ok: true, post: post });
            }
        }
    });
});



export default PostRouter;