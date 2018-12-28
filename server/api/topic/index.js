const router = require('express').Router();

const { ObjectID } = require('mongoose');

const { requireAuth, injectUsers } = require('../middleware')
const { Post } = require('../../models/post');
const { User } = require('../../models/user');

router.get('/popular', async (req, res, next) => {
    try {
        const posts = await Post.find();
        const topicCount = []

        posts.forEach(post => {
            if(topicCount[post.topic] === undefined) {
                topicCount[post.topic] = 1
            } else {
                topicCount[post.topic] += 1
            }
        });

        const tuples = Object.keys(topicCount).map((key) => {
            return [topicCount[key], key];
        });
          
        tuples.sort(function(first, second) {
            return second[0] - first[0];
        });
          
        const top = tuples.slice(0, 5);
        const response = top.map(topic => ({
            topic: topic[1],
            posts: topic[0],
        }))

        res.send(response)
    } catch(e) {
        console.log(e);
        res.status(500).send(e);
    }
});

/**
 * /api/post/subscriptions
 * 
 * Get all posts in the user's subscriptions
 * 
 * [Post]
 */
router.get('/subscriptions', requireAuth, async (req, res, next) => {
    const userId = req.session.user;

    try {
        const subscriptions = (await User.findById(userId)).topics;
        const posts = await Post.find({ topic: { $in: subscriptions } });
        
        res.locals.posts = posts;
        next();
    } catch (e) {
        console.log(e);

        res.status(500).send(e);
    }
}, injectUsers);

/**
 * /api/post/all
 * 
 * Get all posts
 * 
 * [Post]
 */
router.get('/all', async (req, res, next) => {

    try {
        const posts = await Post.find();

        res.locals.posts = posts;
        next();
    } catch (e) {
        console.log(e);

        res.status(500).send(e);
    }
}, injectUsers);

/**
 * URL: /api/topic/:topicId
 * 
 * Return all posts in the given topic
 */
router.get('/:topicId', async (req, res, next) => {
    const { topicId } = req.params;

    try {
        const posts = await Post.find({
            topic: topicId
        });

        res.locals.posts = posts;
        next();
    } catch (e) {
        res.status(500).send(e);
    }
}, injectUsers);


/**
 * URL: /api/topic/:topicId
 * 
 * Subscribe the current user to the given topic.
 * 
 * body: {} Nothing required in body
 */
router.post('/:topicId/subscribe', requireAuth, async (req, res) => {
    const { topicId } = req.params;
    try {
        const user = await User.findById(req.session.user);

        if (!user.topics.includes(topicId)) {
            user.topics.push(topicId);

            const response = await user.save();

            res.send(response);
        } else {
            res.status(500).send({ message: 'Already subscribed to this topic' })
        }

    } catch (e) {
        res.status(500).send(e);
    }
});

/**
 * URL: /api/topic/:topicId
 * 
 * Unsubscribe the current user to the given topic
 * 
 * body: {} Nothing required in
 */
router.post('/:topicId/unsubscribe', async (req, res) => {
    const { topicId } = req.params;
    try {
        const user = await User.findById(req.session.user);

        if (user.topics.includes(topicId)) {
            const index = user.topics.indexOf(topicId);
            user.topics.splice(index, 1);

            const response = await user.save();

            res.send(response);
        } else {
            res.status(202).send({ message: 'Not subscribed to this topic' })
        }

    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;