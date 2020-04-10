const _ = require('lodash');

const defaultHandlers = require('../Handler/index');
const Service = require('./Service');

function DefaultService({
  identifier,
  basePath,
  allowedMethods = [],
  validations,
  Model
}) {
  const possibleMethods = ['all', 'get', 'post', 'put', 'delete'];
  const service = Service({
    identifier,
    basePath,
    allowedMethods,
    validations,
    Model
  });

  possibleMethods.forEach((method) => {
    const handler = _.get(defaultHandlers, method)({ basePath, service });
    service.addHander(method, handler);
  });

  return Object.freeze(service);
}

module.exports = DefaultService;
