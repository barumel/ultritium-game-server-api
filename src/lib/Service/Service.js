const _ = require('lodash');

const validator = require('../../Validator');
const UnsupportedHandler = require('../Handler/Unsupported');

function Service({
  identifier,
  basePath,
  allowedMethods = [],
  validations,
  Model
}) {
  const handlers = {};
  const service = {
    getHandler(method) {
      return allowedMethods.includes(method)
        ? _.get(handlers, method.toLowerCase())
        : UnsupportedHandler({ basePath, service, method: method.toLowerCase() });
    },
    addHander(method, handler) {
      if (!_.isUndefined(_.get(handlers, method))) {
        throw new Error(`Handler "${method}" for service ${id} (${basePath}) already registered. Use replaceHandler to replace it.`);
      }

      _.isFunction(handler)
        ? _.set(handlers, `${method.toLowerCase()}.func`, handler)
        : _.set(handlers, method.toLowerCase(), handler);
    },
    replaceHandler(method, handler) {
      _.isFunction(handler)
        ? _.set(handlers, `${method.toLowerCase()}.func`, handler)
        : _.set(handlers, method.toLowerCase(), handler);
    },
    getModel() {
      return Model;
    },
    getValidations() {
      return _.cloneDeep(validations);
    },
    getValidator() {
      return validator;
    },
    getBasePath() {
      return basePath;
    },
    getIdentifier() {
      return identifier;
    }
  };

  return Object.freeze(service);
}

module.exports = Service;
