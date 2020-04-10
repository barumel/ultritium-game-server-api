const DefaultService = require('../lib/Service/Default');
const Model = require('../models/Game');

function GameListService() {
  const validations = {
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
    basePath: '/game/list',
    allowedMethods: ['all', 'get', 'put', 'post', 'delete'],
    validations,
    Model
  });
}

module.exports = GameListService;
