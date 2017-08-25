const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ownedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
