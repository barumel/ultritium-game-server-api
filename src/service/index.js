const UserService = require('./User');
const MainService = require('./Main');
const GameListService = require('./GameList');
const GameStartService = require('./GameStart');
const GameStopService = require('./GameStop');
const GameRestartService = require('./GameRestart');
const GameStatusService = require('./GameStatus');

module.exports = {
  user: UserService(),
  main: MainService(),
  gamestart: GameStartService(),
  gamestop: GameStopService(),
  gamerestart: GameRestartService(),
  gamestatus: GameStatusService(),
  gamelist: GameListService()
};
