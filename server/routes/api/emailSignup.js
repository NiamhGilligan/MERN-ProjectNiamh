var emailSignup = require('../../models/emailSignup');
var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();

module.exports =(app)=> {
  //importing this into server.js
  app.post('/api/account/emailsignup', (req, res, next) => {

    var {body} = req;
    var {
      firstName,
      email,
    } = body;

    if (!firstName) {
      return res.send({
        success: false,
        message: 'Error:firstname cannot be blank'
      });
    }
    if (!email) {
      return res.send({
        success: false,
        message: 'Error:email cannot be blank'
      });
    }

    email = email.toLowerCase();


    emailSignup.find({email: email}, (err, previousUsers) => {

      if (err) {
        return res.send({
          success: false,
          message: 'Error:Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'account taken'
        });
      }
      //save new user

      var newEmail = new emailSignup();

      newEmail.email = email;
      newEmail.firstName = firstName;

      newEmail.save((err, newEmail) => {

        return res.send({
          success: true,
          message: 'signed up'

        });
        if (err) {
          return res.send({
            success: false,
            message: 'Error:Server error'
          });
        }


      });

    });
  });


};

