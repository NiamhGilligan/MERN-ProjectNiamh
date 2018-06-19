import React from 'react';
import validator from 'email-validator';
import createReactClass from 'create-react-class';


var EmailField = createReactClass({

  getInitialState: function() {
    return {
      valid: false,
      value: ""
    };
  },

  onChange: function(e) {
    if (!validator.validate(e.target.value)) {
      this.setState({
        valid: false,
        value: e.target.value
      });
    } else {
      this.setState({
        valid: true,
        value: e.target.value
      });
    }
  },

  clear: function() {
    this.setState({
      valid: false,
      value: ""
    });
  },

  render: function() {
    var formClass = this.state.valid ? "form-group" : "form-group has-error";
    return (
      <div className={formClass}>
        <input placeholder="Email" className="form-control"
               onChange={this.onChange} value={this.state.value} />
      </div>
    );
  }

});

export default  EmailField;
