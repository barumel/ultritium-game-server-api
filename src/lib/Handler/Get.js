function GetHandler({ basePath, service }) {
  async function get(req, res) {
    const Model = service.getModel();

    try {
      const id = req.params.id;
      const result = await Model.findById(id);

      res.status(200);
      res.json(result);
    } catch (err) {
      res.status(404);
      res.json({ error: err.message });
    }
    res.json({ message: 'Get a single user' });
  }

  return Object.freeze({
    id: `${service.getIdentifier()}-get`,
    path: `${basePath}/:id`,
    method: 'get',
    func: get
  });
}

module.exports = GetHandler;
