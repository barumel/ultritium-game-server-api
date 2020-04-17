const mongoose = require('mongoose');
const _ = require('lodash');
const uuid = require('uuid');

const { Schema } = mongoose;
const { v4 } = uuid;

function Model({ identifier, definition = {} }) {
  const schema = new Schema({
    ...definition,
    _id: { type: String, default: v4 },
  });

  schema.set('toJSON', {
     transform: function (doc, ret, options) {
       ret.id = ret._id;
       delete ret._id;
       delete ret.__v;
     }
  });

  return mongoose.model(identifier, schema);
}

module.exports = Model;
