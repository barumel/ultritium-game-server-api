const _ = require('lodash');

const services = require('./service/index');

function Routes() {
  const possibleMethods = ['all', 'get', 'post', 'put', 'delete'];

  function init(router) {
    _.forEach(services, (service) => {
      possibleMethods.forEach((m) => {
        const handler = service.getHandler(m);
        const { path, func, method } = handler;
        router[method](path, func);
      });
    });
  }

  return Object.freeze({
    init
  });
}

module.exports = Routes;
