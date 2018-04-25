var router = require('express').Router();
var controller = require('./userController');

var auth = require('../../auth/auth');
var authController = require('../../auth/user/controller');

var checkSession = [auth.decodeToken(), authController.getUserData()];

// setup boilerplate route jsut to satisfy a request
// for building
router.param('id', controller.params);

// GET my user's info
router.get('/me', checkSession, controller.me);

// POST new user
router.route('/create')
  .post(controller.verifyUser(), controller.post)

// GET all user
router.route('/all')
	.get(controller.get)

// user - Token status
router.get('/status', checkSession, controller.status);

// Sign in user
router.post('/signin', authController.verifyUser(), authController.signin);

// GET, PUT and DELETE user
router.route('/:id')
  .get(controller.getOne)
  ////////////////////////////////////se comentareo porque no se que poso/////////////////////////////////////////////////
  //si se quita deja de funcionar el crear user
//  .put(controller.verifyUpdateUser(), controller.put) //check user
  .delete(controller.delete) //check user

module.exports = router;
