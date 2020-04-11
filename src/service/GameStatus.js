const _ = require('lodash');

const Service = require('../lib/Service/Service');
const docker = require('../Docker');
const Model = require('../models/Game');
const DefaultGame = require('../lib/Game/Default');

function GameStatus() {
  const service = Service({
    identifier: 'gamestart',
    basePath: '/game/start',
    allowedMethods: ['all', 'get']
  });

  async function gameStatusAll(req, res) {
    try {
      const result = await Model.find({}).lean().exec();
      const games = result.map((record) => DefaultGame({ game: record }));

      const payload = [];
      for (const game of games) {
        const record = game.getDBRecord();
        const { identifier } = record;
        const { GAME_STATUS_STOPPED } = game;

        let status = {
          status: GAME_STATUS_STOPPED,
          stats: {}
        };

        try {
          status = await game.status();
        } catch (error) {
          console.warn(`Cannot get status for ${record.identifier}`);
          console.log(error);
        }

        const entry = {
          identifier,
          ...status
        };

        payload.push(entry)
      }

      res.status(200);
      res.json(payload);
    } catch (err) {
      res.status(500);
      res.json({ message: err.message });
    }
  }

  async function gameStatusGet(req, res) {
    const { params } = req;
    const { id } = params;

    try {
      const record = await Model.findById(id);

      if (_.isUndefined(record) || _.isNull(record)) {
        res.status(404);
        res.json({ message: `Game with id "${id}" not found` });

        return false;
      }

      const { identifier } = record;
      const game = DefaultGame({ game: record });
      const { GAME_STATUS_STOPPED } = game;
      let status = {
        status: GAME_STATUS_STOPPED,
        stats: {}
      };

      try {
        status = await game.status();
      } catch (error) {
        console.warn(`Cannot get status for ${identifier}`);
        console.log(error);
      }

      const payload = {
        identifier,
        ...status
      };

      res.status(200);
      res.json(payload);
    } catch (err) {
      res.status(500);
      res.json({ message: err.message });
    }

    return true;
  }

  const allHandler = {
    id: 'gamestatus-all',
    path: '/game/status',
    method: 'get',
    func: gameStatusAll
  };

  const getHandler = {
    id: 'gamestatus-get',
    path: '/game/status/:id',
    method: 'get',
    func: gameStatusGet
  };

  service.addHandler('all', allHandler);
  service.addHandler('get', getHandler);

  return Object.freeze(service);
}

module.exports = GameStatus;
