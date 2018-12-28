const router = require('express').Router();
const { User } = require('../../models/user');
const { ObjectID } = require('mongodb')

/**
 * URL: /api/user/:id
 *
 * Return data of a specific user with id
 */
router.get('/:id', (req, res) => {
  const id = req.params.id

  // Check if ID is vale
  if (!ObjectID.isValid(id)) {
		return res.status(404).send()
	}

	// Otheriwse, findById
	User.findById(id).then((user) => {
		if (!user) {
			res.status(404).send()
		} else {
			res.send( user )
		}

	}).catch((error) => {
		res.status(400).send(error)
	})
});

/**
 * URL: /api/user/:userId/:postId
 *
 * Add a post's title to the user's post property
 */
router.patch('/:userId/:postTitle', async (req, res) => {
  const userId = req.params.userId
  const postTitle = req.params.postTitle
  // Make sure user is logged in
  try {
    const user = await User.findById(userId);
    user.posts.push(postTitle);
    const savedUser = await user.save();
    res.send(savedUser);
  } catch(e) {
    res.status(500).send(e);
  }

});


module.exports = router
