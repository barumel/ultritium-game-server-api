const _ = require('lodash');

const DefaultService = require('../lib/Service/Default');

const Model = require('../models/User');

function UserService() {
  const validations = {
    username: {
      type: 'string',
      required: true
    },
    firstName: {
      type: 'string',
      required: false
    },
    lastName: {
      type: 'string',
      required: false
    },
    nickname: {
      type: 'string',
      required: false
    }
  };

  const service = DefaultService({
    identifier: 'user',
    basePath: '/user',
    allowedMethods: ['all', 'get', 'put', 'post', 'delete'],
    validations,
    Model
  });

  const defaultPostHandler = service.getHandler('post');
  const defaultPutHandler = service.getHandler('put');

  async function getUserByUsername(username) {
    const users = await Model.find({ username });

    return _.get(users, 0);
  }

  async function post(req, res, next) {
    const { body } = req;
    const { username } = body;

    if (!_.isUndefined(username)) {
      const existing = await getUserByUsername(username);
      if (!_.isUndefined(existing)) {
        res.status(404);
        res.json({ message: `The given username ${username} is already in use` });

        return false;
      }
    }

    return defaultPostHandler.func(req, res, next);
  }

  async function put(req, res, next) {
    const { body, params } = req;
    const { username } = body;
    const { id } = params;

    if (!_.isUndefined(username)) {
      const existing = await getUserByUsername(username);
      if (!_.isUndefined(existing) && existing._id !== id) {
        res.status(404);
        res.json({ message: `The given username ${username} is already in use` });

        return false;
      }
    }

    return defaultPutHandler.func(req, res, next);
  }

  service.replaceHandler('post', post);
  service.replaceHandler('put', put);

  return service;
}

module.exports = UserService;
