var Lesson = require('../../models/LessonPlan');
var express = require('express');
var app = express();
var words = require( '../../../client/app/words');
var router = require('express').Router;
var path = require('path');

module.exports =(app)=> {
//works on postman
  app.get('/api/account/getLessons', (req, res, next) => {

    Lesson.find({}).sort({title: -1}).exec({}, function (err, lessonplans) {
      if (err)
        res.send(err);
      res.json(lessonplans);


    })
  });

  //download file
  app.get('/download/:file(*)',(req, res) => {
    var file = req.params.file;
    var fileLocation = path.join('./uploads',file);
    console.log(fileLocation);
    res.download(fileLocation, file);
  });


};



