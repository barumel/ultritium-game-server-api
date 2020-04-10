const mongoose = require('mongoose');

const { Schema } = mongoose;

function Model({ definition = {} }) {
  const schema = new Schema(definition);

  schema.set('toJSON', {
     transform: function (doc, ret, options) {
       ret.id = ret._id;
       delete ret._id;
       delete ret.__v;
     }
  });

  return mongoose.model('User', schema);
}

module.exports = Model;
