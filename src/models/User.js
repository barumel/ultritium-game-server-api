const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  nickname: String
});


module.exports = mongoose.model('User', UserSchema);
