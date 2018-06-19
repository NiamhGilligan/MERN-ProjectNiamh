var mongoose = require('mongoose');


// Define collection and schema for Items
var ItemSchema = new mongoose.Schema ({

  item: {

    type: String,
    default:''
  }


});

module.exports = mongoose.model('Item', ItemSchema);
