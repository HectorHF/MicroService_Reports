var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  // dont store the password as plain text
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  this.password = this.encryptPassword(this.password);
  next();
})

// Always save names in lowercase

userSchema.pre('save', function(next) {
  if (!this.isModified('name')) return next();

  this.name = this.name.toLowerCase();
  next();
})

userSchema.methods = {
  // check the passwords on signin
  authenticate: function(plainPassword) {
    return bcrypt.compareSync(plainPassword, this.password);
  },
  // hash the passwords
  encryptPassword: function(plainPassword) {
    if (!plainPassword) {
      return ''
    } else {
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainPassword, salt);
    }
  },

  toJson: function() {
    var obj = this.toObject()
    delete obj.password;
    return obj;
  }
};


module.exports = mongoose.model('user', userSchema);
