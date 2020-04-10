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
    addHandler(method, handler) {
      if (!_.isUndefined(_.get(handlers, method))) {
        throw new Error(`Handler "${method}" for service ${identifier} (${basePath}) already registered. Use replaceHandler to replace it.`);
      }

      if (_.isFunction(handler)) {
        const current = _.get(handlers, method);
        _.set(handlers, method, { ...current, func: handler });
      } else {
        _.set(handlers, method.toLowerCase(), handler);
      }
    },
    replaceHandler(method, handler) {
      if (_.isFunction(handler)) {
        const current = _.get(handlers, method);
        _.set(handlers, method, { ...current, func: handler });
      } else {
        _.set(handlers, method.toLowerCase(), handler);
      }
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

  return service;
}

module.exports = Service;
