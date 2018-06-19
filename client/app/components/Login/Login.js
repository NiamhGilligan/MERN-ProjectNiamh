import React, { Component } from 'react';
import 'whatwg-fetch';

import MyAccount from '../AccountHomePage/MyAccountPage';
import {
  getFromStorage,
  setInStorage,
} from "../../utils/storage";


class Login extends Component {
  constructor(props){
    super(props);
    this.state ={
      token:'',
      signInError:'',
      signInEmail: '',
      signInPassword:'',
      valid: false,
    };
      this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.logout = this.logout.bind(this);

  }


  componentDidMount() {
    this.forceUpdate();
    const obj = getFromStorage('the_main_app');
    if(obj && obj.token){
      const {token} = obj;
      //verifying token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json =>{
          if(json.success){
            this.setState({
              token,
              isLoading:false
            });
          }else{
            this.setState({
              isLoading:false,
            });
          }
        });
    }else{
      this.setState({
        isLoading:false,
      });
    }
  }


  onTextboxChangeSignInEmail(event){
    this.setState({
      signInEmail:event.target.value,
    });
  }
  onTextboxChangeSignInPassword(event){
    this.setState({

      signInPassword:event.target.value
    });
  }

  onSignIn(){
    //grabbing the state and post request to backend
    const {

      signInEmail,
      signInPassword,

    } = this.state;
    this.setState({
      isLoading:true,
    });
    fetch('/api/account/signin', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        email: signInEmail,
        password:signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {

        if (!json.success){
          alert('Incorrect Details. Please try again');
          window.location.reload()
        }
        if (json.success){
          setInStorage('the_main_app',{token: json.token});
          setInStorage('user', json.user._id);
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInEmail: '',
            signInPassword:'',
            token:json.token,
          });

        }


      });
  }
  logout(){
    this.setState({
      isLoading:true,
    });
    const obj = getFromStorage('the_main_app');
    if(obj && obj.token){
      const {token} = obj;
      //verifying token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json =>{
          if(json.success){
            this.setState({
              token:'',
              isLoading:false
            });
          }else{
            this.setState({
              isLoading:false,
            });
          }
        });
    }else{
      this.setState({
        isLoading:false,
      });
    }
  }


  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      valid,

    } = this.state;

    if (isLoading) {
      return (<div><p>Loading....</p></div>);
    }
    if (!token) {
      return (

        <div className="loginBox">
          <button
               className="user fa fa-address-card btn-default"> <br/>Teachers Toolbox</button>
          <h2>Log in Here</h2>
            <br/>
            <p>Email</p>
            <input
              className="valinput"
              name="email"
              placeholder='email'
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
              type="text"
              id="inputUsername"
              required
            />
          <small>{this.email ? this.signInEmail.validationMessage : null}</small>
            <br/>
            <p>Password</p>
            <input
              id ="password"
              className="valinput"
              name="password"
              type="password"
              placeholder='**********'
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
              minLength={4}
              required
            />
          <small>{this.password ? this.signInPassword.validationMessage : null}</small>
            <br/><br/>

            <button
              onClick={this.onSignIn}>Submit</button>
            <br/>
            <a href="#">Forgot your password ?</a>


        </div>

      );
    }
    return (
      <div>
        <div className="alert alert-success">
          <strong>Success!</strong> You are logged in!.
          <button className ="btn-success" onClick={this.logout}>Logout</button>
        </div>

        <MyAccount/>

      </div>
    );
  }
}



export default Login;
