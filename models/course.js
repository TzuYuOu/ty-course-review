const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const courseSchema = new Schema({
  courseId: { type: String, required: true},
  name: { type: String, required: true},
  teacher: { type: String, required: true},
  dept: { type: String, required: true},
  time: { type: String, required: true},
  reviews: [ { type: Schema.Types.ObjectId ,ref: 'Review'}]
})


module.exports = mongoose.model('Course', courseSchema);