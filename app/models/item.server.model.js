var mongoose = require('mongoose'),
    Schema = mongoose.Schema
    autoIncrement = require('mongoose-auto-increment');

var ItemSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: '',
    trim: true,
    required: 'Name cannot be blank',
    unique: true
  },
  price: {
    type: Number,
    default: 0,
    required: 'Price cannot be blank'
  },
  category: {
    type: Number,
    default: 0,
    required: 'Category cannot be blank'
  },
});

ItemSchema.plugin(autoIncrement.plugin, { model: 'Item', field: 'itemId' });

mongoose.model('Item', ItemSchema);