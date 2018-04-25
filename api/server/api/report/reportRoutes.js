var router = require('express').Router();
var controller = require('./reportController');

//var auth = require('../../../auth/auth');
//var authController = require('../../../auth/report/tasks/controller');

//var checkSession = [auth.decodeToken(), authController.getUserData()];

// setup boilerplate route jsut to satisfy a request
// for building
router.param('2', controller.params);

// GET the tasks info
router.route('/task').get(controller.getTasks)

// GET the habits info
router.route('/habit').get(controller.getHabits)

// GET the tasks info
router.route('/task/user/:userId').get(controller.getTasksByUser)

// GET the habits info
router.route('/habit/user/:userId').get(controller.getHabitsByUser)

module.exports = router;
