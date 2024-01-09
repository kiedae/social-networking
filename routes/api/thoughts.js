const router = require('express').Router();

const userRoutes = require('./users');
const thoughtRoutes = require('./thoughts');

router.use('/user',userRoutes);
router.use('/thought',thoughtRoutes);

module.exports = router;