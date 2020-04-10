const Model = require('./Model');

const definition = {
  username: String,
  firstName: String,
  lastName: String,
  nickname: String
};

module.exports = Model({ identifier: 'User', definition });
