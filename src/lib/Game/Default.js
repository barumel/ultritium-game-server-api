const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');
const compose = require('docker-compose');

const docker = require('../../Docker');

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

    const limits = _.get(config, 'limits', { cpus: 1, memory: 1000 });
    const cpuCount = _.get(limits, 'cpus');
    const memoryAmount = _.get(limits, 'memory');

    const cpus = _.isNumber(cpuCount)
      ? cpuCount > 3 ? 3 : cpuCount
      : 1;

    const memory = _.isNumber(memoryAmount)
     ? memoryAmount > 6000 ? 6000 : memoryAmount
     : 500;

    const componseFileContent = {
      version: '3.7',
      services: {
        [identifier]: {
          image: _.get(config, 'image'),
          container_name: identifier,
          restart: 'always',
          environment,
          ports,
          deploy: {
            resources: {
              limits: {
                cpus: `${cpus}`,
                memory: `${memory}M`
              }
            }
          }
        }
      },
      volumes: {
        [`${identifier}-gamedata`]: null
      }
    };

    await fs.outputJson(composeFilePath, componseFileContent, { spaces: 2 });
    const result = await compose.upAll({ cwd: composeFileDir, log: true, composeOptions: ['--compatibility'] });

    return result;
  }

  async function stop() {
    const result = await compose.stop({ cwd: composeFileDir, log: true, composeOptions: ['--compatibility'] });

    return result;
  }

  async function status() {
    const container = docker.getContainer(identifier);
    const stats = await container.inspect();

    return _.get(stats, 'State', {});
  }

  function getDBRecord() {
    return _.cloneDeep(game);
  }

  return Object.freeze({
    identifier,
    start,
    stop,
    status,
    getDBRecord
  });
}

module.exports = Game;
