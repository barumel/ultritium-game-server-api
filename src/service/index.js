const UserService = require('./User');
const MainService = require('./Main');
const GameListService = require('./GameList');

module.exports = {
  user: UserService(),
  main: MainService(),
  gamelist: GameListService()
};
