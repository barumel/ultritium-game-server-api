function RemoveHandler({ basePath, service }) {
  async function remove(req, res) {
    const Model = service.getModel();

    try {
      const id = req.params.id;
      await Model.remove({ _id: id });

      res.status(200);
      res.json({});
    } catch (err) {
      res.status(500);
      res.json({ message: err.message });
    }
  }

  return Object.freeze({
    id: `${service.getIdentifier()}-delete`,
    path: `${basePath}/:id`,
    method: 'delete',
    func: remove
  });
}

module.exports = RemoveHandler;
