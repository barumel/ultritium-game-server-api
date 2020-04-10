const _ = require('lodash');
const Docker = require('dockerode');

const socketPath = _.get(process, 'env.DOCKER_SOCKET_PATH', '/var/run/docker.sock');

module.exports = new Docker({ socketPath });
