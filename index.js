const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const cors = require('cors');

const Routes = require('./src/Routes');
const Connection = require('./src/Connection');

const port = _.get(process, 'env.API_PORT', 8080);
const server = express();
const router = express.Router();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(express.static('public'));

Routes().init(router);
Connection().init();

server.use('/api', router);

server.listen(port);
console.info('Server listening to ' + port);
