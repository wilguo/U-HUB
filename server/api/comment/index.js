const router = require('express').Router();
const { Comment } = require('../../models/comment');
const { ObjectID } = require('mongodb')


/**
 * URL: /api/comment/:id
 *
 * Return data of a specific comment with id
 *
 * response: {
 *  comment
 * }
 */
router.get('/:id', (req, res) => {
  const id = req.params.id

  // Check if ID is valid
  if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	// Otheriwse, findById
	Comment.findById(id).then((comment) => {
		if (!comment) {
			res.status(404).send()
		} else {
			res.send( comment )
		}

	}).catch((error) => {
		res.status(400).send(error)
	})
});

/**
 * URL: /api/comment/:comment/like
 *
 * Add a like to a comment
 *
 */
router.post('/:comment/like', (req, res) => {
  const commentId = req.params.comment
  const userId = req.session.user

  //Check if user is logged in
  if (userId === undefined){
    res.status(500).send("User not logged in")
  }
  else{
    // Find comment and add user to likes array
    Comment.findById(commentId).then((comment)=>{
      comment.likes.push(new ObjectID(userId))
      comment.save().then((comment) => {
        res.send(comment)
      }).catch((error) => {
        res.status(500).send(error)
      })
    }).catch((error) => {
      res.status(500).send(error)
    })
  }


});

/**
 * URL: /api/comment/:comment/like
 *
 * Remove a like from a comment
 *
 */
router.patch('/:comment/unlike', (req, res) => {
  const commentId = req.params.comment
  const userId = req.session.user

  //Check if user is logged in
  if (userId === undefined){
    res.status(500).send("User not logged in")
  }
  else{
    const userObjectId = new ObjectID(userId)
    // Find comment and add user to likes array
    Comment.findById(commentId).then((comment)=>{
      comment.likes = comment.likes.remove(userObjectId)
      comment.save().then((comment) => {
        res.send(comment)
      }).catch((error) => {
        res.status(500).send(error)
      })
    }).catch((error) => {
      res.status(500).send(error)
    })
  }

});

/**
 * URL: /api/comment/:comment/like
 *
 * Add a dislike to a comment
 *
 */
router.post('/:comment/dislike', (req, res) => {
  const commentId = req.params.comment
  const userId = req.session.user

  //Check if user is logged in
  if (userId === undefined){
    res.status(500).send("User not logged in")
  }
  else{
    // Find comment and add user to dislikes array
    Comment.findById(commentId).then((comment)=>{
      comment.dislikes.push(new ObjectID(userId))
      comment.save().then((comment) => {
        res.send(comment)
      }).catch((error) => {
        res.status(500).send(error)
      })
    }).catch((error) => {
      res.status(500).send(error)
    })
  }

});

/**
 * URL: /api/comment/:comment/like
 *
 * Remove a dislike from a comment
 *
 */
router.patch('/:comment/undislike', (req, res) => {
  const commentId = req.params.comment
  const userId = req.session.user

  //Check if user is logged in
  if (userId === undefined){
    res.status(500).send("User not logged in")
  }
  else{
    const userObjectId = new ObjectID(userId)
    // Find comment and add user to likes array
    Comment.findById(commentId).then((comment)=>{
      comment.dislikes = comment.dislikes.remove(userObjectId)
      comment.save().then((comment) => {
        res.send(comment)
      }).catch((error) => {
        res.status(500).send(error)
      })
    }).catch((error) => {
      res.status(500).send(error)
    })
  }
});

module.exports = router;
