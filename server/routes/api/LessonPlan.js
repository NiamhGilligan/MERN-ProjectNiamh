var Lesson = require('../../models/LessonPlan');
var express = require('express');
var app = express();
var router = express.Router();
var upload = require('express-fileupload');
var multer = require('multer');
var path = require('path');

module.exports =(app)=> {



  const multerConf = {

    storage : multer.diskStorage({

      destination : function(req , file, next){
        filename = 'upload';
        next(null, './upload');
      },
      limits:{fileSize:1000000},
      filename: function(req, file, next){
        console.log('filename >>>>>>', req.query.filename);
        next(null, req.query.filename);
      }
    }),
  };



  //importing this into server.js
  //posting lesson to database and saving
  //tested :working.

  app.post('/api/account/createLesson', multer(multerConf).single('LessonPlan'), (req, res, next) => {

    var {body} = req;
    var {
      title,
      description,
      resources,
      classlevel,
      subject,
      file,
      user,


    } = body;
    /*
        if (!title) {
          return res.send({
            success: false,
            message: 'Error:title cannot be blank'
          });
        }
        if (!description) {
          return res.send({
            success: false,
            message: 'Error:description cannot be blank'
          });
        }
        if (!resources) {
          return res.send({
            success: false,
            message: 'Error:resources cannot be blank'
          });
        }
        if (!classlevel) {
          return res.send({
            success: false,
            message: 'Error: class Level cannot be blank'
          });
        }
        if (!subject) {
          return res.send({
            success: false,
            message: 'Error: subject cannot be blank'
          });
        }
        if (!file) {
          return res.send({
            success: false,
            message: 'Error: file not uploaded'
          });
        }
    */
    //save new user

    var newLesson = new Lesson();

    newLesson.title = title;
    newLesson.description = description;
    newLesson.resources = resources;
    newLesson.classlevel = classlevel;
    newLesson.subject = subject;
    newLesson.file = file;
    newLesson.user = user;
    // Need to save the filename for each lesson
    newLesson.filename = req.query.filename;
    if(req.file){
      req.body.file = req.file.filename;
      console.log(req.body);
    }

    newLesson.save((err, lesson) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error:Server error'
        })
      }


      return res.send({
        success: true,
        message: 'Saved'
      })

    });

    // return res.redirect('http://localhost:8080/MyAccount');
  });
  //fileupload



//getting all lessonplans sorted by title
  app.get('/api/account/getLessons', (req, res, next) => {
    Lesson.find({user: req.query.user}).sort({title:-1}).exec({},function(err,lessonplans){
      if(err)
        res.send(err);
      res.json(lessonplans);


    });
  });

  app.get('/api/account/AllLessons', (req, res, next) => {
    Lesson.find({}).sort({title:-1}).exec({},function(err,lessonplans){
      if(err)
        res.send(err);
      res.json(lessonplans);


    });
  });

  app.get('/api/account/usersLesson', function (req,res,next){
    Lesson.find(req.params.id, function (err, lessonplans) {
      if (err) return next(err);
      res.json(lessonplans);
    });
  });




  //get single lessonplan by id
  router.put('/api/account/getLesson/:id', function (req,res,next){
    Lesson.findById(req.params.id, function (err, lessonplans) {
      if (err) return next(err);
      res.json(lessonplans);
    });
  });

//download file

  app.get('/download/:file(*)',(req, res) => {
    var file = req.params.file;
    var fileLocation = path.join('./uploads',file);
    console.log(fileLocation);
    res.download(fileLocation, file);
  });
  //Delete book
  //working

  app.delete('/api/account/getLesson/:id', function(req,res, next) {
    Lesson.findByIdAndRemove(req.params.id, req.body, function (err, lessonplans) {
      if(err) res.send(err);
      res.json(lessonplans);
    });

  });

// UPDATE
  router.put('/api/account/edit/:id', (req, res) => {

    // Validate the age
    let title = sanitizeTitle(req.body.title);
    if ( title == '') return res.status(403).json({ success: false, msg: `This lesson needs a title.` });
    else if ( title.length > 50) return res.status(403).json({ success: false, msg: `Title is too long` });

    let updatedLesson = {
      title: santizeTitle(req.body.title),
      description: req.body.description,
      resources: req.body.resources,
      subject: req.body.subject,
      classlevel: req.body.classlevel,
      file: req.body.file
    };

    Lesson.findOneAndUpdate({ _id: req.params.id }, updatedLesson, { runValidators: true, context: 'query' })
      .then((oldResult) => {
        Lesson.findOne({ _id: req.params.id })
          .then((newResult) => {
            res.json({
              success: true,
              msg: `Successfully updated!`,
              result: {
                _id: newResult._id,
                title: newResult.title,
                description: newResult.description,
                resources: newResult.resources,
                subject: newResult.subject,
                classlevel: newResult.classlevel,
                file: newResult.file
              }
            });
          })
          .catch((err) => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });

          });
      })
      .catch((err) => {
        if (err.errors) {
          if (err.errors.title) {
            res.status(400).json({ success: false, msg: err.errors.title.message });
            return;
          }
          if (err.errors.description) {
            res.status(400).json({ success: false, msg: err.errors.description.message });
            return;
          }
          if (err.errors.resources) {
            res.status(400).json({ success: false, msg: err.errors.resources.message });
            return;
          }
          if (err.errors.subject) {
            res.status(400).json({ success: false, msg: err.errors.subject.message });
            return;
          }
          if (err.errors.classlevel) {
            res.status(400).json({ success: false, msg: err.errors.classlevel.message });
            return;
          }
          if (err.errors.file) {
            res.status(400).json({ success: false, msg: err.errors.file.message });
            return;
          }
          // Show failed if all else fails for some reasons
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        }
      });
  });
//update
  app.put('/api/account/edit/:lesson_id',function(req, res) {
    Lesson.findById(req.params.lesson_id, function(err, lessonplans) {
      if (err)
        res.send(err);
      //setting the new data to whatever was changed. If
//nothing was changed we will not alter the field.
      (req.body.title) ? lessonplans.title = req.body.title : null;
      (req.body.description) ? lessonplans.description = req.body.description : null;
      //save comment
      Lesson.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Comment has been updated' });
      });
    });
  })



};
sanitizeTitle = (title) => {
  return title.toLowerCase();
};
