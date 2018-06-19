import React, { Component } from 'react';
import 'whatwg-fetch';
import {
  getFromStorage,
} from "../../utils/storage";


//create component

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token:'',
      contactName:'',
      contactEmail:'',
      contactMobile:'',
      contactMessage:'',
      nameValid: false

    };
    this.onTextboxChangecontactName = this.onTextboxChangecontactName.bind(this);
    this.onTextboxChangecontactEmail = this.onTextboxChangecontactEmail.bind(this);
    this.onTextboxChangecontactMobile = this.onTextboxChangecontactMobile.bind(this);
    this.onTextboxChangecontactMessage = this.onTextboxChangecontactMessage.bind(this);


    this.onSubmitForm = this.onSubmitForm.bind(this);

  }

  onTextboxChangecontactName(event){
    this.setState({
      contactName :event.target.value,
    });
  }
  onTextboxChangecontactEmail(event){
    this.setState({
      contactEmail :event.target.value,
    });
  }
  onTextboxChangecontactMobile(event){
    this.setState({
      contactMobile:event.target.value,
    });
  }
  onTextboxChangecontactMessage(event){
    this.setState({
      contactMessage: event.target.value,
    });
  }



  onSubmitForm(){


    const {
      contactName,
      contactEmail,
      contactMobile,
      contactMessage
    } = this.state

    fetch('/api/account/contact', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        name : contactName ,
        email : contactEmail,
        mobile: contactMobile,
        message:contactMessage,
      }),
    }).then(res => res.json())
      .then(json => {
        if (!json.success){
          alert('Please ensure all fields are filled in and number is at least 10 characters.');
          window.location.reload()
        }
        if (json.success){
          this.setState({
            contactName:'',
            contactEmail:'',
            contactMobile:'',
            contactMessage:'',
          });
          alert("Congratulations! Your message has been received!. We will contact you shortly. ");
        }

      });


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


  render() {

    const{
      contactName,
      token,
      contactEmail,
      contactMobile,
      contactMessage

    } = this.state;

    var homeStyle = {

      backgroundColor:'#839CF7     ',
      opacity: '0.9',
      padding: '2em',
      marginLeft:'-250',


    };
    var conStyle = {

      padding: '2em',

      marginLeft:'350',
      marginTop:'-50',

    };

    if (token) {
      return (


        <div>
          <div className="container-fluid" style={homeStyle}>

            <form style={conStyle}>
              <h1>Contact us or request a lesson by filling out the form below:</h1>
              <div className="col-md-6 form-line">
                <div className="form-group">
                  <label>Your name</label>
                  <input
                    value={contactName}
                    onChange={this.onTextboxChangecontactName}
                    type="text" className="form-control" id="" placeholder=" Enter Name"/>
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email"
                         value={contactEmail}
                         onChange={this.onTextboxChangecontactEmail}
                         className="form-control" id="exampleInputEmail" placeholder=" Enter Email "/>
                </div>
                <div className="form-group">
                  <label>Mobile No.</label>
                  <input type="tel"
                         value={contactMobile}
                         onChange={this.onTextboxChangecontactMobile}
                         className="form-control" id="telephone" placeholder=" Enter 10-digit mobile no."/>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label> Message</label>
                    <textarea
                      value={contactMessage}
                      onChange={this.onTextboxChangecontactMessage}
                      className="form-control" id="description" placeholder="Enter Your Message"></textarea>
                  </div>
                  <div>

                    <button type="button"
                            onClick={this.onSubmitForm}
                            className="btn btn-default submit"><i className="fa fa-paper-plane"
                                                                  aria-hidden="true"></i> Send Message
                    </button>
                  </div>

                </div>
              </div>
            </form>
          </div>

        </div>

      );
    }
    if (!token) {
      return(

        <div><h1>Please sign in to view Contact page.</h1></div>

      );

    }

  }
}

export default Contact;
