const mongoose = require('mongoose');
const _ = require('lodash');

function Connection() {
  function init() {
    const options = {
      dbName: _.get(process, 'env.MONGODB_DB_NAME', 'gameserver'),
      user: _.get(process, 'env.MONGODB_USER', 'foo'),
      pass: _.get(process, 'env.MONGODB_PASS', 'barbaz'),
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    const url = `mongodb://${_.get(process, 'env.MONGODB_HOST', 'localhost')}:${_.get(process, 'env.MONGODB_PORT', '27017')}`;

    mongoose.connect(url, options);
  }

  return Object.freeze({
    init
  });
}

module.exports = Connection;
