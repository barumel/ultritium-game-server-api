const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const Routes = require('./src/Routes');
const Connection = require('./src/Connection');

const port = _.get(process, 'env.API_PORT', 8080);
const server = express();
const router = express.Router();

// configure app to use bodyParser()
// this will let us get the data from a POST
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

Routes().init(router);
Connection().init();

server.use('/', router);

server.listen(port);
console.info('Server listening to ' + port);
