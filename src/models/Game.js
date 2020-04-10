const mongoose = require('mongoose');

const Model = require('./Model');

const definition = {
  identifier: String,
  name: String,
  description: String,
  config: {
    type: mongoose.Mixed,
    default: {}
  }
};

module.exports = Model({ identifier: 'Game', definition });
