const UserService = require('./User');
const MainService = require('./Main');

module.exports = {
  user: UserService(),
  main: MainService()
};
