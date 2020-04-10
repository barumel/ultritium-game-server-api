const _ = require('lodash');

const Service = require('../lib/Service/Service');
const docker = require('../Docker');
const Model = require('../models/Game');

function GameStatus() {
  const service = Service({
    identifier: 'gamestart',
    basePath: '/game/start',
    allowedMethods: ['get']
  });

  async function gameStatus(req, res) {
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
      const container = docker.getContainer(identifier);
      const result = await container.inspect();
      const { State } = result;

      res.status(200);
      res.json(State);
    } catch (err) {
      res.status(500);
      res.json({ message: err.message });
    }

    return true;
  }

  const handler = {
    id: 'gamestatus-get',
    path: '/game/status/:id',
    method: 'get',
    func: gameStatus
  };

  service.replaceHandler('get', handler);

  return Object.freeze(service);
}

module.exports = GameStatus;
