const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');
const compose = require('docker-compose');

function Game({ game }) {
  const { identifier, config } = game;

  const gamesDockerPath = _.get(process, 'env.GAMES_DOCKER_PATH', path.join(process.cwd(), 'containers'));
  const composeFileDir = path.join(gamesDockerPath, identifier);
  const composeFilePath = path.join(composeFileDir, 'docker-compose.yml');

  async function start() {
    const environment = _.get(config, 'environment', [])
      .map((e) => `${_.get(e, 'key')}=${_.get(e, 'value')}`);
    const ports = _.get(config, 'ports', [])
      .map((p) => `${_.get(p, 'from')}:${_.get(p, 'to')}`);

    const componseFileContent = {
      version: '3.1',
      services: {
        [identifier]: {
          image: _.get(config, 'image'),
          container_name: identifier,
          restart: 'always',
          environment,
          ports
        }
      },
      volumes: {
        [`${identifier}-gamedata`]: null
      }
    };

    await fs.outputJson(composeFilePath, componseFileContent, { spaces: 2 });
    const result = await compose.upAll({ cwd: composeFileDir });

    return result;
  }

  async function stop() {
    const result = await compose.stop({ cwd: composeFileDir });

    return result;
  }

  return Object.freeze({
    start,
    stop
  });
}

module.exports = Game;
