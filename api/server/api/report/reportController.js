var Task = require('request');
var Habit = require('request');
var id;

Task('https://cryptic-inlet-78225.herokuapp.com/api/task', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);
});

Habit('https://microservicehabit.herokuapp.com/api/habit', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);
});

Task('https://cryptic-inlet-78225.herokuapp.com/api/task/user/' + id, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);
});

Habit('https://microservicehabit.herokuapp.com/api/habit/user/' + id, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body);
});

var _ = require('lodash');

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

exports.getTasks = function(req, res, next) {
  Task.find()
  .then(function(tasks){
    res.json(tasks.map(function(task){
      return task.toJson();
    }));
  }, function(err){
    next(err);
  });
};

exports.getHabits = function(req, res, next) {
  Habit.find()
  .then(function(habits){
    res.json(habits.map(function(habit){
      return habit.toJson();
    }));
  }, function(err){
    next(err);
  });
};

exports.getTasksByUser = function(req, res, next) {
  var tasks = req.userID;
  res.json(tasks.toJson());
};

exports.getHabitsByUser = function(req, res, next) {
  var user = req.user;
  res.json(user.habits.toJson());
};
