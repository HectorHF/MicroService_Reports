var Teacher = require('../../api/player/playerModel');
var signToken = require('../auth').signToken;

exports.signin = function(req, res, next) {
  // req.user will be there from the middleware
  // verify user. Then we can just create a token
  // and send it back for the client to consume
  var token = signToken(req.user._id);
  res.json({token: token});
};

exports.getUserData = function() {
  return function(req, res, next) {
    Teacher.findById(req.user._id)
      .then(function(user) {
        if (!user) {
          // if no user is found it was not
          // it was a valid JWT but didn't decode
          // to a real user in our DB. Either the user was deleted
          // since the client got the JWT, or
          // it was a JWT from some other source
          res.status(401).send('Unauthorized');
        } else {
          // update req.user with fresh user from
          // stale token data
          req.user = user;
          next();
        }
      }, function(err) {
        next(err);
      });
  }
};

// Signin function
exports.verifyUser = function() {
  return function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    // if no username or password then send
    if (!username || !password) {
      res.status(400).send('Es necesario ingresar un usuario y una contraseña válida');
      return;
    }

    // look user up in the DB so we can check
    // if the passwords match for the username
    Teacher.findOne({username: username.toLowerCase()})
      .then(function(user) {
        if (!user) {
          res.status(401).send('El usuario ingresado no existe');
        } else {
          // checking the passwords here
          if (!user.authenticate(password)) {
            res.status(401).send('La contraseña es incorrecta');
          } else {
            // if everything is good,
            // then attach to req.user
            // and call next so the controller
            // can sign a token from the req.user._id
            req.user = user;
            next();
          }
        }
      }, function(err) {
        next(err);
      });
  };
};

// Check Teacher's group permissions
exports.validateGroup = function() {
  return function(req, res, next) {
    var userGroup = req.user.groupID
    var groupID = req.params.id
    console.log(userGroup)
    console.log(groupID)
    if (userGroup.equals(groupID)) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  }
};
