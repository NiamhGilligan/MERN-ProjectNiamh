import React, { Component } from 'react';
import {ControlLabel,Button}from 'react-bootstrap';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import {
  getFromStorage
} from "../../utils/storage";

//create component

class CreateLesson extends Component{
  constructor(props) {
    super(props);
    this.state = {

      token:'',
      setTitle: '',
      setDescription: '',
      setResources: '',
      setClass: '',
      setSubject: '',
      setFile: '',
      myFilename:''
    };
    this.onTextboxChangeSetTitle = this.onTextboxChangeSetTitle.bind(this);
    this.onTextboxChangeSetDescription = this.onTextboxChangeSetDescription.bind(this);
    this.onTextboxChangeSetResources = this.onTextboxChangeSetResources.bind(this);
    this.onTextboxChangeSetClass = this.onTextboxChangeSetClass.bind(this);
    this.onTextboxChangeSetSubject = this.onTextboxChangeSetSubject.bind(this);
    this.onTextboxChangeSetFile = this.onTextboxChangeSetFile.bind(this);



    this.Upload = this.Upload.bind(this);


  }

  componentDidMount(){
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



  onTextboxChangeSetTitle(event){
    this.setState({
      setTitle:event.target.value,
    });
  }
  onTextboxChangeSetDescription(event){
    this.setState({
      setDescription:event.target.value,
    });
  }
  onTextboxChangeSetResources(event){
    this.setState({
      setResources:event.target.value,
    });
  }
  onTextboxChangeSetClass(event){
    this.setState({
      setClass: event.target.value,
    });
  }
  onTextboxChangeSetSubject(event){
    this.setState({
      setSubject: event.target.value,
    });
  }
  onTextboxChangeSetFile(event){
    this.setState({
      setFile: event.target.value,
    });
  }

  Upload(){
    const {
      setTitle,
      setDescription,
      setResources,
      setClass,
      setSubject,
      setFile,
      myFilename,
    } = this.state;

    const user = window.localStorage.getItem('user');
    this.setState({
      isLoading:true,
    });

    // Generating filename here
    const generateFileName = () => {
      // Making an array with each segment of the path
      const pathArray = setFile.split('\\');
      // Take the last segment which should be the filename and split that into an array at '.'
      const filenameArray = pathArray[pathArray.length - 1].split('.');
      // Store the file extension
      const fileExt = filenameArray[filenameArray.length - 1];
      // Remove it from the array and join pack together in a string
      const filename = filenameArray.slice(0, -1).join('.');
      // Now joining it all back together with timestamp to make each lesson unique
      const uniqueFilename = `${[ filename, Date.now() ].join('_')}.${fileExt}`;

      return uniqueFilename
    };

    const form = document.querySelector('#my-form');
    const formdata = new FormData(form);

    formdata.append('title', setTitle);
    formdata.append('description', setDescription);
    formdata.append('resources', setResources);
    formdata.append('classlevel', setClass);
    formdata.append('subject', setSubject);
    formdata.append('user', user);


    fetch(`/api/account/createLesson?filename=${generateFileName()}`, {
      method:'POST',
      body: formdata
    })
      .then(res => res.json())
      .then(json => {
        if (!json.success){
          alert('Incorrect Details. Please ensure all fields are filled out.');
          window.location.reload()
        }
        if (json.success){
          alert("Congratulations! You uploaded a Lesson!.");
          window.location.reload()
          this.setState({
            isLoading: false,

          });

          if(this.props.history) {
            this.props.history.push('/MyAccount');
          } else {
            window.location.href = 'http://localhost:8080/MyAccount';
          }

        }


      });

  }








  render() {
    const{

      token


    } = this.state;


    var homeStyle = {

      backgroundColor:'#839CF7     ',
      opacity: '1.0',
      padding: '2em',
      marginLeft:'250',

    };
    const{
      setTitle,
      setDescription,
      setResources,
      setClass,
      setSubject,
      setFile
    } = this.state;

    if (!token) {
      return(

        <div><h1>Please sign in to view Create Lesson Page.</h1></div>

      );

    }
    if (token) {
      return (


        <div className="well" style={homeStyle}>
          <div className="Contact">

            <br/>
            <h2>Add Lesson Plan</h2>
            <br/>
            <form  id="my-form" method="POST" encType="multipart/form-data" action="/api/account/createLesson">
              <div className='form-group'>
                <label>Title:
                  <br/>
                  <input
                    className='form-control'
                    id="formControlsTitle"
                    type="title"
                    value={setTitle}
                    onChange={this.onTextboxChangeSetTitle}
                    placeholder="Enter title"
                  /> </label>
              </div>
              <br/>
              <div className='form-group'>
                <label>
                  Description:
                  <br/>
                  <input
                    className='form-control'
                    id="formControlsDescription"
                    type="Description"
                    value={setDescription}
                    onChange={this.onTextboxChangeSetDescription}
                    placeholder=" Description"
                  />
                </label>
              </div>
              <br/>
              <div className='form-group'>
                <label> Resources:
                  <br/>
                  <input
                    className='form-control'
                    id="formControlsResources"
                    type="Resources"
                    value={setResources}
                    onChange={this.onTextboxChangeSetResources}
                    placeholder="Resources"
                  /></label>
              </div>
              <br/>
              <div className='form-group'>
                <ControlLabel>Class</ControlLabel>
                <select placeholder="class"
                        className='form-control'
                        value={setClass}
                        onChange={this.onTextboxChangeSetClass}
                >
                  <option value="class">Class</option>
                  <option value="junior">Junior Infants</option>
                  <option value="Senior">Senior Infants</option>
                  <option value="1st">1st class</option>
                  <option value="2nd">2nd class</option>
                  <option value="3rd">3rd class</option>
                  <option value="4th">4th class</option>
                  <option value="5th">5th class</option>
                  <option value="6th">6th class</option>
                </select>
              </div>
              <div className='form-group'>
                <br/>
                <ControlLabel>Subject:</ControlLabel>
                <br/>
                <select placeholder="Subject"
                        className='form-control'
                        value={setSubject}
                        onChange={this.onTextboxChangeSetSubject}>
                  <option value="Subject">Subject</option>
                  <option value="English">English</option>
                  <option value="Gaeilge">Gaeilge T1</option>
                  <option value="Gaeilge2">Gaeilge T2</option>
                  <option value="Maths">Mathematics</option>
                  <option value="PE">Physical Education</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Science">Science</option>
                  <option value="Arts">Visual Arts</option>
                  <option value="Drama">Drama</option>
                  <option value="Music">Music</option>
                  <option value="SPHE">SPHE</option>
                </select>

                <br/>
              </div>
              <div className='form-group'>
                <label> Upload a file
                  <input
                    id="formControlsFile"
                    name="LessonPlan"
                    type="file"
                    className='form-control btn btn-success'
                    value={setFile}
                    onChange={this.onTextboxChangeSetFile}
                  />

                </label>
                <div className="col-sm-6">

                  <button className="btn btn-primary"

                          onClick={this.Upload}><Link to={`/MyAccount`}>Upload</Link>

                  </button>

                </div>
              </div>
            </form>

            <div>

            </div>
          </div>
        </div>
      );
    }
  }
}

export default CreateLesson;
