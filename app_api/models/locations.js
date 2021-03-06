var mongoose = require('mongoose');

/* subdocument schemas go before parent */
var reviewSchema = new mongoose.Schema({
  author: {type: String, required: true },
  rating: {type: Number, required: true, min: 0, max: 5},
  reviewText: {type: String, required: true},
  createdOn: {type: Date, "default": Date.now}
});

/* subdocument schema */
var openingTimeSchema = new mongoose.Schema({
  days: {type: String, required: true},
  opening: String,
  closing: String,
  closed: {type: Boolean, required: true}
});

var locationSchema = new mongoose.Schema({
  name: {type: String, required: true},
  address: String,
  rating: {type: Number, "default": 0, min: 0, max: 5},
  facilities: [String],
  coords: {type: [Number], index: '2dsphere'}, // [lng, (then) lat]
  openingTimes: [openingTimeSchema],
  reviews: [reviewSchema]
});

// compile schema into a model (model name, schema to use)
// collection will be pluralized lowercase of model
// model instances will map 1:1 to db documents
mongoose.model('Location', locationSchema);
