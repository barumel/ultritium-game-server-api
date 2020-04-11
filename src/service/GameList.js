const DefaultService = require('../lib/Service/Default');
const Model = require('../models/Game');

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

  const service = DefaultService({
    identifier: 'gamelist',
    basePath: '/gamelist',
    allowedMethods: ['all', 'get', 'put', 'post', 'delete'],
    validations,
    Model
  });

  return Object.freeze(service);
}

module.exports = GameListService;
