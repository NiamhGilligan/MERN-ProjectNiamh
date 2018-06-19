var User = require('../../models/User');
var UserSession = require('../../models/UserSession');
var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();

module.exports =(app)=>{
  //importing this into server.js
  app.post('/api/account/signup',(req,res,next)=>{

    var {body} = req;
    var {
      firstName,
      lastName,
      access_token,
      email,
      password
    } =body;

    if(!firstName){
      return res.send({
        success: false,
        message:'Error:firstname cannot be balnk'
      });
    }
    if(!lastName){
      return  res.send({
        success: false,
        message:'Error:lastname cannot be balnk'
      });
    } if(!email){
      return res.send({
        success: false,
        message:'Error:email cannot be balnk'
      });
    }
    if(!password || password <=5){
      return res.send({
        success: false,
        message:'Error:password cannot be balnk'
      });
    }
    email = email.toLowerCase();

    //verify email and save
    User.find({
      email: email
    },(err,previousUsers)=>{
      if(err){
        return res.send({
          success:false,
          message:'Error:Server error'
        });
      } else if(previousUsers.length>0){
        return  res.send({
          success:false,
          message:'account taken'
        });
      }

      //save new user

      var newUser = new User();

      newUser.email =email;
      newUser.firstName =firstName;
      newUser.lastName = lastName;
      newUser.password = newUser.generateHash(password);
      newUser.save((err,user)=>{
        if(err){
          return res.send({
            success:false,
            message:'Error:Server error'
          });
        }

        res.cookie('Authorization', 'Bearer ' + user.access_token);
        return res.send({
          success:true,
          message:'signed up'

        });
      });
    });
  });

  app.post('/api/account/signin',(req,res,next)=> {

    var {body} = req;
    var {
      email,
      password
    } = body;

     if(!email){
      return res.send({
        success: false,
        message:'Error:email cannot be blank'
      });
    }
    if(!password) {
      return res.send({
        success: false,
        message: 'Error:password cannot be blank'
      });
    }
    email = email.toLowerCase();

     User.find({
       email: email,
     },(err,users) =>{
       if(err) {
         return res.send({
           success: false,
           message: 'Error'

         });
       }
       if (users.length!=1){
         return res.send({
           success:false,
           message:'Invalid'
         });
       }
       const  user = users[0];
       if(!user.validPassword(password)){
         return res.send({
           success:false,
           message:'Error: Invalid'
         });
       }

       //correct user
      const userSession = new UserSession();
       userSession.userId = user._id;
       userSession.save((err,doc)=> {
         if(err){
           return res.send({
             success:false,
             message:'Error:Server error'
           });
         }

         res.cookie('Authorization', 'Bearer ' + user.access_token);
         return res.send({
           user: user,
           success:true,
           message:'Valid sign in ',
           token: doc._id

         });

       });
     });


  });

  app.get('/api/account/verify',(req,res,next)=> {
//getting token
    const {query} = req;
    const {token} = query;

    UserSession.find({
      _id: token,
      isDeleted: false
    },(err, sessions)=> {
      if (err){
        return res.send({
          success:false,
          message: 'error'
        });
      }

      if(sessions.length != 1) {
        return res.send({
          success: false,
          message: 'error'
        });
      } else{

        return res.send({
          success: true,
          message: 'success'
        });


      }

    });
  });


  app.get('/api/account/logout',(req,res,next)=> {
    const {query} = req;
    const {token} = query;

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    },{
    $set:{isDeleted:true}
    },null,(err, sessions)=> {
      if (err) {
        return res.send({
          success: false,
          message: 'error'
        });
      }

      return res.send({
        success: true,
        message: 'success'
      });
    });
  });


};




