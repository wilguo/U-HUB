const router = require('express').Router();
const { Post } = require('../../models/post');
const { Comment } = require('../../models/comment');
const { ObjectID } = require('mongodb')
const { User } = require('../../models/user');

const aws = require('aws-sdk');
aws.config.region = 'us-east-1'
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const { requireAuth, injectUser, injectUsers} = require('../middleware');

/**
 * URL: api/post/upcoming
 *
 * Get all the upcoming events.
 */
router.get('/upcoming', requireAuth, async (req, res, next) => {
  try {
    const userId = req.session.user;
    const user = await User.findById(userId);
    const goingToEvents = await Post.find({_id: {$in: user.goingToEvents}})

    res.send(goingToEvents);
  } catch(e) {
    res.status(500).send(e);
  }
})

/**
 * URL: /api/post/:id
 *
 * Return data of a specific post with id
 */
router.get('/:id', async (req, res, next) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

  try {
    const post = await Post.findById(id);
    if(!post) {
      res.status(404).send({error: 'Post not found'});
    } else {
      res.locals.post = post;
      next();
    }
  } catch(e) {
    res.status(500).send(e);
  }
}, injectUser);

/**
 * URL: /api/post/
 *
 * Create a post
 *
 * body: {
 *  type,
 *  topic,
 *  title,
 *  description,
 *  date,
 *  location
 * }
 */
router.post('/', requireAuth, async (req, res, next) => {
  const {
    type,
    topic,
    title,
    description,
    date,
    location
  } = req.body
  try {

    let eventBody = null;
    if(req.files != undefined && req.files.media !== undefined) {
      const imageFile = req.files.media;

      const s3 = new aws.S3();
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Body: imageFile.data,
        Key: imageFile.name+'-'+new Date().toISOString(),
        ACL: 'public-read'
      }
      const uploadResponse = await (s3.upload(params).promise());
      eventBody = {
        date: new Date(date),
        location: location,
        media: uploadResponse.Location
      }
    } else if(type === 'event'){
      eventBody = {
        date: new Date(date),
        location: location
      }
    }

    const post = await Post.create({
      type: type,
      topic: topic,
      title: title,
      description: description,
      uid: new ObjectID(req.session.user),
      eventBody: eventBody,
      comments: []
    })
    res.locals.post = post;
    next()
  } catch (e) {
    console.log(e)
    res.status(500).send(e);
  }
}, injectUser);


/**
 * URL: /api/post/:id
 *
 * Update the given post
 *
 * body: { Data fields to update
 *  title,
 *  content,
 *  etc.
 * }
 */
router.patch('/:id', (req, res, next) => {
  const {title, description} = req.body
  const id = req.params.id

  // Find the post
  Post.findById(id).then((post) => {
    if (!post) { //If not found then send an error
      res.status(404).send()
    } else {
      //Update whatever fields were sent
      if (title !== undefined){
        post.title = title
      }
      if (description !== undefined){
        post.description = description
      }

      post.save().then((post) => {
        res.locals.post = post;
        next();
      }).catch((error) => {
        res.status(400).send(error)
      })
    }
  }).catch((error) => {
    res.status(400).send(error)
  })


}, injectUser);

/**
 * URL: /api/post/:id/going
 *
 * Add a user to the users array
 *
 */
router.post('/:id/going', requireAuth, async (req, res) => {
  const userId = req.session.user
  const postId = req.params.id
  // Make sure user is logged in
  if (userId === undefined){
    res.status(500).send("User not logged in")
  } else{
    try {
      const post = await Post.findById(postId);
      post.eventBody.users.push(new ObjectID(userId));
      const savedPost = await post.save();

      const user = await User.findById(userId);
      user.goingToEvents.push(new ObjectID(postId));
      const savedUser = await user.save();
      res.send({post: savedPost, user: savedUser});
    } catch(e) {
      res.status(500).send(e);
    }
  }
});

/**
 * URL: /api/post/:id/ungoing
 *
 * User not going to event anymore, so remove them from
 * necessary arrays
 *
 *
 *
 */
router.patch('/:id/ungoing', requireAuth, async (req, res) => {
  const postId = req.params.id
	const userId = req.session.user

  if (userId === undefined){
    res.status(500).send("User not logged in")
  } else{
    try {
      const post = await Post.findById(postId);
      post.eventBody.users = post.eventBody.users.remove(new ObjectID(userId));
      const savedPost = await post.save();

      const user = await User.findById(userId);
      user.goingToEvents = user.goingToEvents.remove(new ObjectID(postId));
      const savedUser = await user.save();
      res.send({post: savedPost, user: savedUser});
    } catch(e) {
      res.status(500).send(e);
    }
  }
});

/**
 * URL: /api/post/:id/comment
 *
 * Add a comment to the given post
 *
 * body: {
 *  content
 * }
 */
router.post('/:id/comment', (req, res) => {
  const postId = req.params.id
	const userId = req.session.user

  // Check if user is logged in
  if (userId === undefined){
    res.status(500).send("User not logged in")
  }
  else{
    // Find post associated with comment
    Post.findById(postId).then((post) => {
      const comment = new Comment({
        uid: new ObjectID(userId),
        postId: post._id,
        content: req.body.content,
        likes: [],
        dislikes: []
      })
      //Save comment to database then add it to the post's comments array
      comment.save().then((comment) => {
          post.comments.push(comment._id)
          // Save the post
          post.save().then((post) => {
            res.send(post) // Send the post
          }).catch((error) => {
            res.status(500).send(error)
          })
        }).catch((error) => {
          res.status(500).send(error)
        })
	}).catch((error) => {
    res.status(500).send(error)
  })
  }
});


/**
 * URL: /api/post/:id/:comment
 *
 * Delete a comment from the given post.
 * Need to delete it from the post array and
 * from the comment collection.
 *
 *
 */
router.delete('/:id/:comment', (req, res) => {
  const postId = req.params.id
	const userId = req.session.user
  if (userId === undefined){
    res.status(500).send("User not logged in")
  }
  else{
    const commentId = new ObjectID(req.params.comment)

    //delete from post
  	Post.findById(postId).then((post)=>{
      const array = post.comments.remove(commentId)
      post.comments = array // remove from comments arry
  		// save post to database
  		post.save().then(post => {
        res.send(post) // send the post with the deleted comment
      })
  	}).catch((error) => {
      res.status(500).send(error)
    })

    // delete from comment collection
    Comment.findByIdAndRemove(commentId).then((comment) => {
    if (!comment) {
      res.status(404).send();
    }
    }).catch((error) => {
      res.status(400).send()
    })
  }
});


/**
 * URL: /api/post/:id/comments
 *
 * Get all comments of the given posts.
 * Returns each comment and the user that made the comment:
 *
 * [{user: <user>, comment: <comment>}, ...]
 */
router.get('/:id/comments', async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comment.find({postId: id});
    const userIds = comments.map((comment) => comment.uid);

    const users = await User.find({_id: {$in: userIds}});
    const response = comments.map(comment => {
      const uid = comment.uid;

      const user = users[users.findIndex((user) => {
          return user._id.equals(uid);
      })];

      return {
        comment: comment,
        user: user
      }
    })

    res.send(response);
  } catch(e) {
    console.log(e);
  }


});


module.exports = router;
