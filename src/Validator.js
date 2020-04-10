const validate = require('@ultritium/validate');

const { DefaultValidator } = validate;

const validator = DefaultValidator();

const messageProvider = validator.getProvider('message');
messageProvider.addMessage('required', 'This value is required');

module.exports = validator;
