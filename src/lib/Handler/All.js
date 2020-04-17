function AllHandler({ basePath, service }) {
  async function all(req, res) {
    const Model = service.getModel();

    try {
      const result = await Model.find();

      res.status(200);
      res.json(result);
    } catch (err) {
      res.status(500);
      res.json({ error: err.message });
    }
  }

  return Object.freeze({
    id: `${service.getIdentifier()}-all`,
    path: basePath,
    method: 'get',
    func: all
  });
}

module.exports = AllHandler;
