const router = require('express').Router();

const { requireAdmin } = require('../middleware.js');
const { User } = require('../../models/user');
const { Post } = require('../../models/post');
const { Comment } = require('../../models/comment');

router.get('/users', requireAdmin, async (req, res) => {
    try {
        const users = await User.find();

        res.send(users);
    } catch(e) {
        res.status(500).send(e);
    }
});

router.patch('/updateUser', requireAdmin, async (req, res) => {
    try {
        const { id } = req.query;
        const { firstName, lastName, password } = req.body;

        const user = await User.findById(id);
        if(firstName !== undefined) {
            user.firstName = firstName;
        }
        if(lastName !== undefined) {
            user.lastName = lastName;
        }

        if(password !== undefined) {
            user.password = password;
        }

        const response = await user.save();

        res.send(response);
    }catch (e) {
        res.status(500).send(e);
    }
});

router.patch('/updatePost', requireAdmin, async (req, res) => {
    try {
        const { id } = req.query;
        const {
            title,
            description,
            date,
            location
        } = req.body;

        const post = await Post.findById(id);
        if(title !== undefined) {
            post.title = title;
        }

        if(description !== undefined) {
            post.description = description
        }

        if(post.type == 'event') {
            if(date !== undefined) {
                post.eventBody.date = new Date(date);
            }

            if(location !== undefined) {
                post.eventBody.location = location;
            }
        }
        const response = await post.save();

        res.send(response);
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

router.delete('/deletePost', requireAdmin, async (req, res) => {
    try {
        const { id } = req.query;

        const result = await Post.findByIdAndDelete(id);

        res.send(result);
    } catch(e) {
        res.status(500).send(e);
    }
});

router.delete('/deleteComment', requireAdmin, async (req, res) => {
    try {
        const { id } = req.query;

        const result = await Comment.findByIdAndDelete(id);

        res.send(result);
    } catch(e) {
        res.status(500).send(e);
    }
});

router.get('/posts', requireAdmin, async (req, res) => {
    try {
        const posts = await Post.find();
        const postIds = posts.map(post => post._id);

        postComments = []
        posts.forEach(post => {
            postComments[post._id.toString()] = []
        })

        const comments = await Comment.find({postId: {$in: postIds}});
        comments.forEach(comment => {
            postComments[comment.postId.toString()].push(comment);
        });

        res.send(posts.map(post => {
            return {
                post: post,
                comments: postComments[post._id.toString()]
            }
        }));
    }catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

router.get('/stats', requireAdmin, async (req, res) => {
    try {
        const posts = await Post.find();
        const users = await User.find();
        const comments = await Comment.find();

        res.send({
            posts: posts.length,
            users: users.length,
            comments: comments.length,
        });
    } catch(e){
        res.status(500).send(e);
    }
})

module.exports = router;
