const Service = require('../lib/Service/Service');

function MainService() {
  const service = Service({
    identifier: 'main',
    basePath: '/',
    allowedMethods: ['all'],
  });

  function all(req, res) {
    res.json({ message: 'Everything fine' });
  }

  const handler = {
    id: 'main-all',
    path: '/',
    method: 'get',
    func: all
  };

  service.addHandler('all', handler);

  return Object.freeze(service);
}

module.exports = MainService;
