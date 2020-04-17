const _ = require('lodash');

const Service = require('../lib/Service/Service');
const Model = require('../models/Game');
const DefaultGame = require('../lib/Game/Default');

function GameRestartService() {
  const service = Service({
    identifier: 'gamestart',
    basePath: '/game/start',
    allowedMethods: ['get']
  });

  async function restartGame(req, res) {
    const { params } = req;
    const { id } = params;

    try {
      const record = await Model.findById(id);

      if (_.isUndefined(record) || _.isNull(record)) {
        res.status(404);
        res.json({ message: `Game with id "${id}" not found` });

        return false;
      }

      const game = DefaultGame({ game: record });
      const result = await game.restart();

      res.status(200);
      res.json(result);
    } catch (err) {
      res.status(500);
      res.json(err);
    }

    return true;
  }

  const handler = {
    id: 'gamerestart-get',
    path: '/game/restart/:id',
    method: 'get',
    func: restartGame
  };

  service.addHandler('get', handler);

  return Object.freeze(service);
}

module.exports = GameRestartService;
