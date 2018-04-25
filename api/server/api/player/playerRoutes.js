var router = require('express').Router();
var controller = require('./playerController');

var auth = require('../../auth/auth');
var authController = require('../../auth/player/controller');

var checkSession = [auth.decodeToken(), authController.getUserData()];

// setup boilerplate route jsut to satisfy a request
// for building
router.param('id', controller.params);

// GET my player's info
router.get('/me', checkSession, controller.me);

// POST new players
router.route('/create')
  .post(controller.verifyPlayer(), controller.post)

// GET all players
router.route('/all')
	.get(controller.get)

// player - Token status
router.get('/status', checkSession, controller.status);

// Sign in player
router.post('/signin', authController.verifyUser(), authController.signin);

// GET, PUT and DELETE players
router.route('/:id')
  .get(controller.getOne)
  ////////////////////////////////////se comentareo porque no se que poso/////////////////////////////////////////////////
  //si se quita deja de funcionar el crear players
//  .put(controller.verifyUpdateplayer(), controller.put) //check user
  .delete(controller.delete) //check user

module.exports = router;
