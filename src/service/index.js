const UserService = require('./User');
const MainService = require('./Main');
const GameListService = require('./GameList');
const GameStartService = require('./GameStart');
const GameStopService = require('./GameStop');
const GameStatusService = require('./GameStatus');

module.exports = {
  user: UserService(),
  main: MainService(),
  gamestart: GameStartService(),
  gamestop: GameStopService(),
  gamestatus: GameStatusService(),
  gamelist: GameListService()
};
