const _ = require('lodash');
const mongoose = require('mongoose');

const Route = require('./Route');
const Model = require('../models/User');
const validator = require('../Validator');

function UserRoute() {
  const validations = {
    validations: {
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
    }
  };

  async function getUserByUsername(username) {
    const users = await Model.find({ username });

    return _.get(users, 0);
  }

  async function all(req, res) {
    try {
      const result = await Model.find();

      res.status(200);
      res.json(result);
    } catch (err) {
      res.status(500);
      res.json({ error: err.message });
    }
  }

  async function get(req, res) {
    try {
      const id = _.get(req, 'params.id');
      const result = await Model.findById(id);

      res.status(200);
      res.json(result);
    } catch (err) {
      res.status(404);
      res.json({ error: err.message });
    }
    res.json({ message: 'Get a single user' });
  }

  async function post(req, res) {
    try {
      const payload = req.body;

      if (!_.isUndefined(_.get(payload, 'id'))) {
        res.status(400);
        res.json({ message: 'ID property must not be present in payload on POST' });

        return false;
      }

      const validationResult = validator.validate(validations, payload);
      if (!_.isEmpty(validationResult)) {
        res.status(400);
        res.json({
          message: 'The given payload is no valid',
          result: validationResult
        });

        return false;
      }

      const existing = await getUserByUsername(payload.username);
      if (!_.isUndefined(existing)) {
        res.status(404);
        res.json({ message: `The given username ${payload.username} is already in use` });

        return false;
      }

      const user = new Model(payload);
      const result = await user.save();

      res.status(201);
      res.json(result);
    } catch (err) {
      res.status(500);
      res.json({ error: err.message });
    }

    return true;
  }

  async function put(req, res) {
    try {
      const id = req.params.id;
      const payload = req.body;

      const validationResult = validator.validate(validations, payload);
      if (!_.isEmpty(validationResult)) {
        res.status(400);
        res.json({
          message: 'The given payload is no valid',
          result: validationResult
        });

        return false;
      }

      const existing = await getUserByUsername(payload.username);
      if (!_.isUndefined(existing) && existing._id.toString() !== id) {
        res.status(404);
        res.json({ message: `The given username ${payload.username} is already in use` });

        return false;
      }

      // Make sure we don't overwrite an existing record if id from params differs to id from payload
      const data = {
        ...payload,
        _id: id
      };

      await Model.replaceOne({ _id: id }, data, { new: true, upsert: true });
      const result = await Model.findById(id);

      res.status(201);
      res.json(result);
    } catch (err) {
      res.status(500);
      res.json({ error: err.message });
    }

    return true;
  }

  async function remove(req, res) {
    try {
      const id = _.get(req, 'params.id');
      await Model.remove({ _id: id });

      res.status(200);
      res.json({});
    } catch (err) {

    }
  }

  return Object.freeze({
    id: 'user',
    handlers: [
      Route({
        id: 'allUsers',
        path: '/user',
        method: 'get',
        func: all
      }),
      Route({
        id: 'getUser',
        path: '/user/:id',
        method: 'get',
        func: get
      }),
      Route({
        id: 'postUser',
        path: '/user',
        method: 'post',
        func: post
      }),
      Route({
        id: 'putUser',
        path: '/user/:id',
        method: 'put',
        func: put
      }),
      Route({
        id: 'deleteUser',
        path: '/user/:id',
        method: 'delete',
        func: remove
      })
    ]
  });
}

module.exports = UserRoute;
