const _ = require('lodash');

const DefaultService = require('../lib/Service/Default');
const Model = require('../models/Game');
const docker = require('../Docker');

function GameListService() {
  const validations = {
    identifier: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    params: {
      type: 'object',
      required: false
    }
  };

  async function all(req, res) {
    try {
      const result = await Model.find().lean().exec();

      const payload = [];
      for (const game of result) {
        const { identifier } = game;
        let State = {
          Status: 'nocontainer'
        };

        try {
          const container = docker.getContainer(identifier);
          const stats = await container.inspect();
          State = _.get(stats, 'State', {});
        } catch (err) {
          console.warn(`Cannot get container status for container with id ${identifier}`);
          console.log(err);
        }

        payload.push({ ...game, status: State });
      }

      res.status(200);
      res.json(payload);
    } catch (err) {
      res.status(500);
      res.json({ error: err.message });
    }
  }

  const service = DefaultService({
    identifier: 'gamelist',
    basePath: '/gamelist',
    allowedMethods: ['all', 'get', 'put', 'post', 'delete'],
    validations,
    Model
  });

  async function get(req, res) {
    try {
      const { params } = req;
      const { id } = params;

      const game = await Model.findById(id).lean().exec();

      const { identifier } = game;

      let result = { game, status: { Status: 'nocontainer' } };
      try {
        const container = docker.getContainer(identifier);
        const stats = await container.inspect();
        result = { ...game, status: _.get(stats, 'State', {}) };
      } catch (err) {
        console.warn(`Cannot get container status for container with id ${identifier}`);
        console.log(err);
      }

      res.status(200);
      res.json(result);
    } catch (err) {
      res.status(404);
      res.json({ error: err.message });
    }
  }

  service.replaceHandler('all', all);
  service.replaceHandler('get', get);

  return Object.freeze(service);
}

module.exports = GameListService;
