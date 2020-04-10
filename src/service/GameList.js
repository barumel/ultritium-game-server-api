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

  return DefaultService({
    id: 'gamelist',
    basePath: '/gamelist',
    allowedMethods: ['all', 'get', 'put', 'post', 'delete'],
    validations,
    Model
  });
}

module.exports = GameListService;
