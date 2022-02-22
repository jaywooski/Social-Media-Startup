const router = require('express').Router();
// const thoughtRoutes = require('./api/thought-routes');
const userRoutes = require('./api/user-routes');

// router.use('/api/thoughts', thoughtRoutes);
router.use('/api/users', userRoutes);

router.use((req, res) => {
    res.status(404).json({ message:'404 error, not found!' })
});

module.exports = router;