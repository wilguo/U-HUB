const { User } = require('../models/user')

const requireAuth = (req, res, next) => {
    if(!req.session.user) {
        res.status(401).send({error: 'You must be logged in to perform this action.'})
    } else {
        next();
    }
}

const requireAdmin = async (req, res, next) => {
    if(!req.session.user) {
        res.status(401).send({error: 'You must be logged in to perform this action'});
    } else {
        const user = await User.findById(req.session.user);
        if(!user) {
            res.status(401).end({error: 'Invalid user.'});
        } else if(!user.isAdmin){
            res.status(401).send({error: 'You are not authorized to perform this action'});
        } else {
            next();
        }
    }
}

const injectUsers = async (req, res) => {
    const { posts } = res.locals;

    const posterIds = posts.map(post => post.uid);
    const posters = await User.find({_id: {$in: posterIds}});

    const postersWithIds = []
    posters.forEach(poster => {
        postersWithIds[poster._id.toString()] = poster;
    })
    const postsWithUsers = posts.map(post => {
        if(post.uid) {
            return {...post._doc, ...{user: postersWithIds[post._doc.uid.toString()]}}
        } else {
            return post;
        }
    });

    res.send(postsWithUsers)
}

const injectUser = async (req, res) => {
    const { post } = res.locals;

    if(post.uid) {
        const poster = await User.findById(post.uid);
        res.send({...post._doc, ...{user: poster}})
    } else {
        res.send(post);
    }
}

module.exports = { requireAuth, requireAdmin, injectUser, injectUsers }