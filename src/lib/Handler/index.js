const AllHandler = require('./All');
const GetHandler = require('./Get');
const PostHandler = require('./Post');
const PutHandler = require('./Put');
const RemoveHandler = require('./Remove');
const UnsupportedHandler = require('./Unsupported');

module.exports = {
  all: AllHandler,
  get: GetHandler,
  post: PostHandler,
  put: PutHandler,
  delete: RemoveHandler,
  unsupported: UnsupportedHandler
};
