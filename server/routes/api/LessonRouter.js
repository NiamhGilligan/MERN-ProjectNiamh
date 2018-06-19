var express = require('express');
var app = express();
var router = express.Router();
var Lesson = require('../../models/LessonPlan');
// Required store route
var Item = require('../../models/Item');
module.exports =(app)=> {




// Defined edit route
  app.route('/api/edit/:id').get(function (req, res, next) {
    var id = req.params.id;
    Item.findById(id, function (err, item) {
      res.json(item);
    });
  });


//  update route
  app.route('/api/update/:id').post(function (req, res, next) {
    Lesson.findById(req.params.id, function (err, title) {
      if (!title) {
        return next(new Error('could not load Document'));
      }
      else { // do your update here
        title.title = req.body.title;
        title.save().then(title => {
          res.json('Update complete');
        })
          .catch((err) => {
            res.status(400).send("unable to update the database");
          });
      }
    });
  });


// delete request
  app.route('/api/delete/:id').get(function (req, res, next) {
    Lesson.findByIdAndRemove({_id: req.params.id}, function (err, item) {
      if (err) {
        res.json(err);
      }
      else {
        res.json('Successfully removed');
      }
    });
  });
};

