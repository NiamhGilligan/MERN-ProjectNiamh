import React, { Component } from 'react';
import Home from '../Home/Home';
import 'whatwg-fetch';
import {
  getFromStorage,
  setInStorage,
} from "../../utils/storage";
//create component

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {

      isLoading:true,
      token:'',
      signUpError:'',
      signUpFirstName:'',
      signUpLastName:'',
      signUpEmail:'',
      signUpPassword:''
    };
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);


    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);


  }

  componentDidMount() {
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

  onTextboxChangeSignUpFirstName(event){
    this.setState({
      signUpFirstName:event.target.value,
    });
  }
  onTextboxChangeSignUpLastName(event){
    this.setState({
      signUpLastName:event.target.value,
    });
  }
  onTextboxChangeSignUpEmail(event){
    this.setState({
      signUpEmail:event.target.value,
    });
  }
  onTextboxChangeSignUpPassword(event){
    this.setState({
      signUpPassword: event.target.value
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

  onSignUp(){
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    } = this.state;
    this.setState({
      isLoading:true,
    });


    if(signUpFirstName.length < 2  || signUpLastName.length < 2 || signUpEmail.length <=1 || signUpPassword.length <=1 ){

      alert('Please ensure all fields are filled out  .');

    }


    fetch('/api/account/signup', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        firstName : signUpFirstName,
        lastName : signUpLastName,
        email: signUpEmail,
        password:signUpPassword,

      }),
    }).then(res => res.json())

      .then(json => {
        if (!json.success){
          alert('Email already taken. Please try a different email.');
          window.location.reload()
        }
        if (json.success){
          setInStorage('the_main_app',{token: json.token});

          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpFirstName:'',
            signUpLastName:'',
            signUpEmail: '',
            signUpPassword:'',
            token:json.token,

          });
          alert("Congratulations! You Registered!.");
          if(this.props.history) {
            this.props.history.push('/Login');
          } else {
            window.location.href = 'http://localhost:8080/Login';
          }
          }

      });


  }

  render() {
    const{
      isLoading,
      token,
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    } = this.state;
    if (isLoading){
      return(<div><p>Loading....</p></div>);
    }

    if(!token) {
      return (

        <div className="loginBox">
          <button
            className="user fa fa-address-card btn-default"> <br/>Teachers Toolbox</button>
          <h2>Register Here</h2>
          <div >
            <p>Firstname</p>
            <input type="text" placeholder="FirstName"
                   value={signUpFirstName}
                   className="valinput"
                   onChange={this.onTextboxChangeSignUpFirstName}
            />
            <br/>
            <p>Last name</p>
            <input
              className="valinput"
              type="text" placeholder="LastName" value={signUpLastName}
                   onChange={this.onTextboxChangeSignUpLastName}
            />


            <br/>
            <p>Email</p>
            <input
              className="valinput"
              name="email"
              placeholder='email'
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
              type="text"

            />
            <br/>
            <p>Password</p>
            <input
              className="valinput"
              name="password"
              type="password"
              placeholder='**********'
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}

            />
            <br/><br/>

            <button
              onClick={this.onSignUp}

                   >Sign Up</button>
            <br/>
            <a href="#">Forgot your password ?</a>
          </div>

        </div>

      );
    }
    if(token) {

      return (
        <div>

          <button className="btn-success" onClick={this.logout}>Logout</button>
          <Home/>
        </div>
      );
    }
    }

}

export default Register;
