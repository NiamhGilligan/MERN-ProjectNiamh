

import React from 'react';
import EmailField from './EmailField.js';
import NameField from './NameField.js';
import request from 'superagent';
import callback from 'superagent';
import createReactClass from 'create-react-class';


var EmailBox = createReactClass({

  getInitialState: function(){
    return {submitted: false};
  },

  onSubmit: function(e) {
    if (!this.refs.fieldEmail.state.valid) {
      alert("Email is required to sign up!");
    } else {
      // super agent post request where request is sent to server
      request.post('/api/account/emailsignup')
      //url for post request matching server post request url
      //.send sending the users input from email and firstname
        .send({ email: this.refs.fieldEmail.state.value })
        .send({ firstName: this.refs.fieldName.state.value })
        .then(json => {
          if (!json.success) {
            alert('Congratulations! You are registered.');
            window.location.reload()
          }

          if(json.success) {
            alert("Congratulations! You are registered.");
            console.log(subscriber['firstName'] + " ; " + subscriber['email']);
          }
        })
        .then(callback);

      var subscriber = {
        email: this.refs.fieldEmail.state.value,
        firstName: this.refs.fieldName.state.value

      };

      this.refs.fieldEmail.clear();
      this.refs.fieldName.clear();

    }
  },
  onChange: function(msg){
    console.log(msg);
    this.setState({submitted: true});
  },

  render: function() {
    var successStyle = {
      color:"green",
      visibility: this.state.submitted ? "visible" : "hidden"
    };
    var boxStyle ={
        opacity: '0.9',
      float:'right',


    };

    return (
      <div className="col-sm-3" style ={boxStyle}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4>Get the latest Lessons sent to you</h4>
          </div>
          <div className="panel-body">
          </div>
          <NameField type="First" ref="fieldName" />
          <br/>
          <EmailField ref="fieldEmail" />
          <div className="row">
            <div className="col-sm-6">
              <button className="btn btn-primary" onClick={this.onSubmit}>
                Submit
              </button>
            </div>
            <div className="col-sm-2">
              <h5 style = {successStyle}>Success</h5>
            </div>
          </div>

        </div>
      </div>
    );
  }

});

export default EmailBox;
