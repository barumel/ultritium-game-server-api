const _ = require('lodash');

const routes = require('./index');

function Routes() {
  function init(router) {
    _.forEach(routes, (Route) => {
      const route = Route();
      const { handlers = [] } = route;

      handlers.forEach((handler) => {
        const { path, method, func } = handler;
        router[method](path, func);
      });
    });
  }

  return Object.freeze({
    init
  });
}

module.exports = Routes;
