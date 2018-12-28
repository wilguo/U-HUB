const router = require('express').Router();
const { Post } = require('../../models/post');
const { Comment } = require('../../models/comment');
const { ObjectID } = require('mongodb')
const { User } = require('../../models/user');





router.get('/:id', (req, res) => {
    const userID = req.session.user
    // Check if ID is vale
    if (!ObjectID.isValid(userID)) {
        return res.status(404).send()
    }
    // Otheriwse, findById
    User.findById(userID).then((post) => {
        if (!post) {
            res.status(404).send()
        } else {
            res.send( post )
        }

    }).catch((error) => {
        res.status(400).send(error)
    })
});


router.patch('/:id', (req, res) => {
    const userId = req.session.user
    const {
        firstName,
        lastName,
        email,
        schoolName,
        yearOfStudy,
        programOfStudy
    } = req.body;
    const id = req.params.id
    if (userId === undefined){
        res.status(500).send("User not logged in")
    } else {
        User.findById(userId).then((user) => {
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.schoolName = schoolName;
            user.yearOfStudy = yearOfStudy;
            user.programOfStudy = programOfStudy;
            user.save().catch((error) => {
                res.status(500).send(error)
            })
        }).catch((error) => {
            res.status(500).send(error)
        })
    }

})


module.exports = router;