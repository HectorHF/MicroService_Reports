var router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/player', require('./player/playerRoutes'));
router.use('/user', require('./user/userRoutes'));
router.use('/report', require('./report/reportRoutes'));


module.exports = router;
