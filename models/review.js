const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  course: {type: Schema.Types.ObjectId, ref: 'Course', required: true},
  user: { type: Schema.Types.ObjectId, ref:'User', required: true},
  review: { type: String, required: true},
  
})

module.exports = mongoose.model('Review', reviewSchema); 