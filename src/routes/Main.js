const Route = require('./Route');

function MainRoute() {
  async function all(req, res) {
    res.json({ message: 'Main Content: Show schemas here...' });
  }

  return Object.freeze({
    id: 'main',
    handlers: [
      Route({
        id: 'allMain',
        path: '/',
        method: 'get',
        func: all
      })
    ]
  });
}

module.exports = MainRoute;
