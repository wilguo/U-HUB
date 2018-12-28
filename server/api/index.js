const router = require('express').Router();

router.use('/post', require('./post'));
router.use('/auth', require('./auth'));
router.use('/topic', require('./topic'));
router.use('/admin', require('./admin'));
router.use('/profile', require('./profile'));
router.use('/comment', require('./comment'));
router.use('/user', require('./user'));
module.exports = router;
