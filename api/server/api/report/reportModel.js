var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var Habit = require('request');
var id;

var reportSchema = new Schema({});

reportSchema.methods = {
  // check the passwords on signin
  // authenticate: function(plainPassword) {
  //   return bcrypt.compareSync(plainPassword, this.password);
  // },
  // // hash the passwords
  // encryptPassword: function(plainPassword) {
  //   if (!plainPassword) {
  //     return ''
  //   } else {
  //     var salt = bcrypt.genSaltSync(10);
  //     return bcrypt.hashSync(plainPassword, salt);
  //   }
  // },

  toJson: function() {
    var obj = this.toObject()
    return obj;
  }
};

module.exports = mongoose.model('report', reportSchema);
