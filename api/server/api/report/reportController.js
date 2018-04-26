var Report = require('./reportModel');
var Task = require('request');
var Habit = require('request');
var User = require('../user/userModel')
var _ = require('lodash');
var userID;
var jsonTasks, jsonTasksUser, jsonHabits, jsonHabitsUser;

function getTasksFromRequest(json){
  jsonTasks = JSON.stringify(json)
}
function getTasksByUserIDFromRequest(json){
  jsonTasksUser = JSON.stringify(json)
}
function getHabitsFromRequest(json){
  jsonHabits = JSON.stringify(json)
}
function getHabitsUserFromRequest(json){
  jsonHabitsUser = JSON.stringify(json)
}

Task('https://cryptic-inlet-78225.herokuapp.com/api/task', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(JSON.stringify(this.bodyTEMP));
  getTasksFromRequest(body);
});

// Task('https://cryptic-inlet-78225.herokuapp.com/api/task/user/' + id, { json: true }, (err, res, body) => {
//   if (err) { return console.log(err); }
//   console.log(body);
//   getTasksUserFromRequest(body);
// });

Habit('https://microservicehabit.herokuapp.com/api/habit', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);
  getHabitsFromRequest(body);
});

Habit('https://microservicehabit.herokuapp.com/api/habit/user/' + userID, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);
  getHabitsUserFromRequest(body);
});


exports.params = function(req, res, next, id) {
  this.id = id;
  User.findById(id)
  .then(function(user) {
    if (!user) {
      next(new Error('There is no User with that ID'));
    } else {
      req.user = user;
      next();
    }
  }, function(err) {
    next(err);
  });
};

exports.paramsbyUser = function(req, res, next, userId) {
  this.UserID = userId;
  requestTasksByUserID(userId);
  Report.find({"userId": userId})
    .then(function(task) {
      if (!task) {
        next(new Error('There is no task with that id'));
      } else {
        req.userId = task;
        next();
      }
    },function(err) {
      next(err);
    });
};

exports.getTasks = function(req, res, next) {
  Report.find()
  .then(function(tasks){
    tasks += jsonTasks;
     res.json(tasks);
  }, function(err){
    next(err);
  });
};

exports.getHabits = function(req, res, next) {
  Report.find()
  .then(function(habits){
    habits += jsonHabits;
     res.json(habits);
  }, function(err){
    next(err);
  });
};

exports.getTasksByUser = function(req, res, userId) {
  //var userID = req.userId;
  console.log(userId + "BLABLABLA");
  console.log("GIL" + JSON.stringify(jsonTasksUser));
  //console.log("GIL" + userID);
  requestTasksByUserID("2");
  res.json(jsonTasksUser);
};

// exports.getTasksByUser = function(req, res, next) {
//   Report.find()
//   .then(function(habits){
//     habits += jsonHabits;
//      res.json(habits);
//   }, function(err){
//     next(err);
//   });
// };

function requestTasksByUserID(userID) {
  Task('https://cryptic-inlet-78225.herokuapp.com/api/task/user/' + userID, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log("CHRISTIAN" + JSON.stringify(body));
    getTasksByUserIDFromRequest(body);
  });
}

exports.getHabitsByUser = function(req, res, next) {
  var habits = req.user;
  res.json(user.habits.toJson());
};
