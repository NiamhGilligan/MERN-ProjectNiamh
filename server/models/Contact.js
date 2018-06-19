var mongoose = require('mongoose');


var ContactSchema = new mongoose.Schema({

  name: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  mobile: {
    type: Number,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },


});


module.exports = mongoose.model('Contact',
  ContactSchema);
