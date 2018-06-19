

var mongoose = require('mongoose');


var EmailSchema = new mongoose.Schema({

  firstName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  }

});



module.exports = mongoose.model('email',
  EmailSchema);
