const router = require('express').Router();

const userRoutes = require('./users');
const thoughtRoutes = require('./thoughts');

router.use('/api/user',userRoutes);
router.use('/api/thought',thoughtRoutes);

module.exports = router;