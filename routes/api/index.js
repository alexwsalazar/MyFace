const router = require('express').Router();
const thoughtRoute = require('./thoughts-route');
const userRoute = require('./users-route');

router.use('/thoughts', thoughtRoute);
router.use('/users', userRoute);

module.exports = router;
