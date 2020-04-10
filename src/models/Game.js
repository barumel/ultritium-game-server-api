const mongoose = require('mongoose');

const Model = require('./Model');

const definition = {
  name: String,
  description: String,
  params: {
    type: mongoose.Mixed,
    default: {}
  }
};

module.exports = Model({ identifier: 'Game', definition });
