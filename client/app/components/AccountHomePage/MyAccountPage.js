import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import 'whatwg-fetch';
import { Link } from 'react-router-dom';
import {getFromStorage} from "../../utils/storage";

class IndexItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          token: '',
            value: '',
            items: ''
        }
    }

    componentDidMount  ()  {
        const user = window.localStorage.getItem('user')
        axios.get('/api/account/getLessons?user='+user)
        .then((response) => {
            this.setState({
                items: response.data
            });
        })
        .catch((error) => {
            console.log(error);
        });

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

    tabRow  ()  {
        if(this.state.items instanceof Array) {
            return this.state.items.map((object, i) => {
                return <TableRow obj={object} key={i} />
            })
        }
    }

    render() {
      const{

        token


      } = this.state;

      var homeStyle = {



        padding: '2em',
        marginLeft:'-125',


      };

      if (!token) {
        return(

          <div><h1>Please sign in to view My Account Page.</h1></div>

        );

      }
  if(token) {
    return (
      <div>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel='stylesheet'
              type='text/css'></link>

        <div className="container" style={homeStyle}>
          <div className="row">
            <div className="col-md-10 col-md-offset-1">

              <div className="panel panel-default panel-table">
                <div className="panel-heading">
                  <div className="row">
                    <div className="col col-xs-6">
                      <h3 className="panel-title"> My Lessons :</h3>
                    </div>
                    <div className="col col-xs-6 text-right">


                      <a className="btn btn-sm btn-primary btn-create"><Link to={`/create`}>Create New Lesson</Link>
                      </a>

                    </div>
                  </div>
                </div>
                <div className="panel-body">
                  <table className="table table-striped table-bordered table-list">
                    <thead>
                    <tr>
                      <th><em className="fa fa-cog"></em></th>

                      <th>Title</th>
                      <th>Description</th>
                      <th>Resources</th>
                      <th>Class Level</th>
                      <th>Subject</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.tabRow()}

                    </tbody>
                  </table>

                </div>
                <div className="panel-footer">
                  <div className="row">
                    <div className="col col-xs-4">Page 1 of 5
                    </div>
                    <div className="col col-xs-8">
                      <ul className="pagination hidden-xs pull-right">
                        <li><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                      </ul>
                      <ul className="pagination visible-xs pull-right">
                        <li><a href="#">«</a></li>
                        <li><a href="#">»</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

    );
  }
    }
}

export default IndexItem;

