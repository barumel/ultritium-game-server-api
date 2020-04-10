const Route = require('./Route');

function UserRoute() {
  const validations = {
    validations: {
      username: {
        type: 'string',
        required: true
      },
      firstName: {
        type: 'string',
        required: false
      },
      lastName: {
        type: 'string',
        required: false
      },
      nickname: {
        type: 'string',
        required: false
      }
    }
  };

  async function all(req, res) {
    console.log('VAL', validations);
    res.json({ message: 'Get all users' });
  }

  async function get(req, res) {
    console.log('VAL', validations);
    res.json({ message: 'Get a single user' });
  }

  return Object.freeze({
    id: 'user',
    handlers: [
      Route({
        id: 'allUsers',
        path: '/user',
        method: 'get',
        func: all
      }),
      Route({
        id: 'getUser',
        path: '/user/:id',
        method: 'get',
        func: get
      })
    ]
  });
}

module.exports = UserRoute;
