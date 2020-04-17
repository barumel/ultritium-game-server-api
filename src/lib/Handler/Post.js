const _ = require('lodash');

function PostHandler({ basePath, service }) {
  async function post(req, res) {
    const Model = service.getModel();
    const validator = service.getValidator();
    const validations = service.getValidations();

    try {
      const payload = req.body;

      if (!_.isUndefined(_.get(payload, 'id'))) {
        res.status(400);
        res.json({ message: 'ID property must not be present in payload on POST' });

        return false;
      }

      const validationResult = validator.validate({ validations }, payload);
      if (!_.isEmpty(validationResult)) {
        res.status(400);
        res.json({
          message: 'The given payload is no valid',
          result: validationResult
        });

        return false;
      }

      const record = new Model(payload);
      const result = await record.save();

      res.status(201);
      res.json(result);
    } catch (err) {
      res.status(500);
      res.json({ error: err.message });
    }

    return true;
  }

  return Object.freeze({
    id: `${service.getIdentifier()}-post`,
    path: basePath,
    method: 'post',
    func: post
  });
}

module.exports = PostHandler;
