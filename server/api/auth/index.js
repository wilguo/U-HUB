const router = require('express').Router();
const { User } = require('../../models/user');

/**
 * URL: /api/auth/isAuthenticated
 *
 * Checks whether user is authenticated or not.
 *
 * response : {
 *  authenticated
 * }
 */
router.get('/isAuthenticated', async (req, res) => {
    if (!req.session.user) {
        res.send({ authenticated: false });
    } else {
        try {
            const user = await User.findById(req.session.user);
            res.send({ authenticated: true, user: user });
        } catch (e) {
            res.status(500).send(e);
        }
    }
})

/**
 * URL: /api/auth/login
 * 
 * Authenticate with the provided credentials. Return the token.
 * 
 * body: {
 *  username,
 *  signUpPassword
 * }
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    // console.log(`logging in: ${username} ${password}`);
    try {

        const user = await User.findByUsernamePassword(username, password);
        req.session.user = user._id;

        res.json(user);
    } catch (e) {
        res.status(500).send({ status: 'error', error: e.message });
    }
});

/**
 * URL: /api/auth/logout
 * 
 * Logout the user
 */
router.get('/logout', async (req, res) => {
    try {
        const result = await req.session.destroy();
        res.send(result);
    } catch (e) {
        res.status(500).send(e);
    }
});


/**
 * URL: /api/auth/register
 * 
 * Create a user
 * 
 * body: {
 *  username,
 *  signUpPassword,
 *  firstName,
 *  lastName,
 *  etc..
 * }
 */
router.post('/register', async (req, res) => {
    const {
        username,
        password,
        firstName,
        lastName,
        email,
        schoolName,
        yearOfStudy,
        programOfStudy
    } = req.body;

    try {
        const user = await User.create({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            schoolName: schoolName,
            yearOfStudy: yearOfStudy,
            programOfStudy: programOfStudy
        });
        req.session.user = user._id;

        res.json(user);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
