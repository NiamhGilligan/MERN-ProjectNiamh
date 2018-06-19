import React, {Component} from 'react'
import SearchInput, {createFilter} from 'react-search-input'
import '../../styles/style2.scss';
import {getFromStorage} from "../../utils/storage";


const KEYS_TO_FILTERS = ['title', 'subject', 'description','file','classlevel','resources'];

class SearchNew extends Component {
  constructor (props) {
    super(props);
    this.state = {
      token:'',
      searchTerm: '',
      lessons :[]
    };
    this.searchUpdated = this.searchUpdated.bind(this)
  }



  componentDidMount() {
    let self = this;
    fetch('/api/account/AllLessons', {
      method: 'GET'
    }).then(function (response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then(function (data) {
      self.setState({lessons: data});
    }).catch(err => {
      console.log('caught it!', err);
    });
//checking if user has a token to view this page
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



  render () {
    const{

      token

    } = this.state;

    const filteredSearch = this.state.lessons.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

    var homeStyle = {



      padding: '2em',
      marginLeft:'-125',


    };

    if (!token) {
      return(

        <div><h1>Please sign in to view Search Page.</h1></div>

      );

    }

    if(token) {

      return (

        <div>

          <div className="container" style={homeStyle}>
            <div className="row">
              <div className="col-md-10 col-md-offset-1">

                <div className="panel panel-default panel-table">
                  <div className="panel-heading">
                    <div className="row">
                      <div className="col col-xs-6">
                        <h3 className="panel-title">Search</h3>
                      </div>
                      <div className="col col-xs-6 text-right">

                        <div>

                          <SearchInput className="fa fa-search" onChange={this.searchUpdated}/>

                        </div>

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

                      {filteredSearch.map(lessons =>
                        <tr>
                          <td align="center">
                            <a className="btn btn-primary" href={`file://../../../../upload/${lessons.filename}`} download><em
                              className="fa fa-download"></em></a>
                          </td>


                          <td>{lessons.title}</td>
                          <td>{lessons.description}</td>
                          <td> {lessons.resources}</td>
                          <td>{lessons.classlevel}</td>
                          <td> {lessons.subject}</td>

                        </tr>
                      )}
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
                          <li><a href="#">Â«</a></li>
                          <li><a href="#">Â»</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>


      )
    }
  }



  searchUpdated (term) {
    this.setState({searchTerm: term})
  }
}
export default SearchNew;
