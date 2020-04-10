const _ = require('lodash');

function PutHandler({ basePath, service }) {
  async function put(req, res) {
    const Model = service.getModel();
    const validator = service.getValidator();
    const validations = service.getValidations();

    try {
      const id = req.params.id;
      const payload = req.body;

      const validationResult = validator.validate({ validations }, payload);
      if (!_.isEmpty(validationResult)) {
        res.status(400);
        res.json({
          message: 'The given payload is no valid',
          result: validationResult
        });

        return false;
      }

      // Make sure we don't overwrite an existing record if id from params differs to id from payload
      const data = {
        ...payload,
        _id: id
      };

      await Model.replaceOne({ _id: id }, data, { new: true, upsert: true });
      const result = await Model.findById(id);

      res.status(201);
      res.json(result);
    } catch (err) {
      res.status(500);
      res.json({ error: err.message });
    }

    return true;
  }

  return Object.freeze({
    id: `${service.getIdentifier()}-put`,
    path: `${basePath}/:id`,
    method: 'put',
    func: put
  });
}

module.exports = PutHandler;
