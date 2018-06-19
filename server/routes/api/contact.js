var Contact = require('../../models/Contact');

var express = require('express');
var app = express();

module.exports =(app)=> {
  //importing this into server.js
  app.post('/api/account/contact', (req, res, next) => {

    var {body} = req;
    var {
      name,
      email,
      mobile,
      message
    } = body;

    if (!name) {

      return res.send({
        success: false,
        message: 'Error:Name cannot be blank'
      });
    }
    if (!email) {
      return res.send({
        success: false,
        message: 'Error:email cannot be blank'
      });
    }
    if (!mobile) {
      return res.send({
        success: false,
        message: 'Error:mobile cannot be blank'
      });
    }
    if (!message) {
      return res.send({
        success: false,
        message: 'Error:message cannot be blank'
      });
    }

    email = email.toLowerCase();


      //save new user

      var contact = new Contact();

      contact.name = name;
    contact.email = email;
    contact.mobile= mobile;
    contact.message = message;

      contact.save((err, contact) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error:Server error'
          });
        }

        return res.send({
          success: true,
          message: 'Message recieved!!'

        });
      });


  });
};

