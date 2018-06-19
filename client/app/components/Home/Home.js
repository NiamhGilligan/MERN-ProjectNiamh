import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'whatwg-fetch';


class Home extends Component {


  render() {
    var homeStyle = {

      backgroundColor:'#839CF7     ',
      opacity: '0.9',


    };


    var fontS = {
      color: 'white',
    };

      return (
       <div>

         <div >
          <div className="promotion-section" style={homeStyle} >
            <div className="container" >
              <div className="row">
                <div className="col-md-9" >
                  <h2 >Welcome to Teachers Toolbox!</h2>
                  <center> <h3 >We provide free Lesson plans for every subject.</h3></center>
                  <br/>
                  <h2> Search, Share and Save time.</h2>
                  <br/>
                  <center> <h5>Sign up now to cut your planning time in half!</h5></center>
                  <br/>
                  <div>
                  <center><h4><Link to={`/Register`} style ={fontS}><span className="fa fa-address-card" aria-hidden="true">

                  </span> Click here to Sign Up! </Link></h4></center>
                  </div>
                </div>
                <div className="col-md-3">

                </div>
              </div>
            </div>
          </div>



         </div>
       </div>

      );
    }

}

export default Home;

