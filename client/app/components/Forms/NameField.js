

var createReactClass = require('create-react-class');
var React = require('react');

var NameField = createReactClass({

  getInitialState: function() {
    return {
      value: ""
    };
  },

  clear: function() {
    this.setState({
      value: ""
    });
  },

  onChange: function(e) {
    this.setState({
      value: e.target.value
    });
  },

  render: function() {
    return (
      <input
        className="form-control"
        placeholder={" Name"}
        onChange={this.onChange} value={this.state.value} />
    );
  }

});

export default NameField;
