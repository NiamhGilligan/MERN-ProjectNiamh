import React, { Component } from 'react';
import 'whatwg-fetch';

import { Link } from 'react-router-dom';


class NavBar extends Component {

  render() {


    var navStyle = {
      WebkitBoxShadow: "0 0 4px rgba(0,0,0,0.4)",
      MozBoxShadow: "0 0 4px rgba(0,0,0,0.4)",
      boxShadow : "0 0 4px rgba(0,0,0,0.4)",

    };



    var titleStyle = {};
    var linkStyle = {};

    if (this.props.bgColor)
      navStyle.background = this.props.bgColor;

    if (this.props.titleColor)
      titleStyle.color = this.props.titleColor;

    if (this.props.linkColor)
      linkStyle.color = this.props.linkColor;
    return (
      <div  >
        <nav style={navStyle} className = "navbar navbar-default">
          <div className="navbar-header">
           <Link style={titleStyle} className="navbar-brand" to="/">Teachers Toolbox</Link>
          </div>

          <div className = "collapse navbar-collapse" id="nav-collapse">
            <ul  className="nav navbar-nav" >

              <li><Link to="/contact" > Contact </Link></li>
              <li><Link to="/create"> Create </Link></li>
              <li> <Link to="/Login"> Login </Link></li>
              <li><Link to="/Register"> Register </Link></li>
              <li><Link to="/MyAccount"> My Account </Link></li>
              <li><Link to="/search"> Search </Link></li>

            </ul>
          </div>
        </nav>
      </div>


    );
  }
}

export default NavBar;
