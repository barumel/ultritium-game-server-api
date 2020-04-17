function UnsupportedHandler({ basePath, service, method }) {
  const path = ['all', 'post'].includes(method)
    ? basePath
    : `${basePath}/:id`;

  async function unsupported(req, res) {
    res.status(405);
    res.json({});
  }

  return Object.freeze({
    id: `${service.getIdentifier()}-unsupported`,
    path,
    method,
    func: unsupported
  });
}

module.exports = UnsupportedHandler;
