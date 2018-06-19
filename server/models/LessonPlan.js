var mongoose = require('mongoose');


var LessonSchema = new mongoose.Schema({

  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  resources: {
    type: String,
    default: ''
  },
  classlevel: {
    type: String,
    default: ''
  },
  subject: {
    type: String,
    default: ''
  },
  file: {
    type: String,
    default: ''
  },
  user: {
    type: String,
    default: ''
  },
  filename: {
    type: String,
    default: ''
  },
});


module.exports = mongoose.model('LessonPlans',
  LessonSchema);
