import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ItemService from './ItemService';


class TableRow extends Component {

    constructor(props) {
        super(props);
      this.state = {
        value: '',
        addItemService :''
      };
        this.addItemService = new ItemService();
        this.handleSubmit =  this.handleSubmit.bind(this);
    }

    handleSubmit (event) {
        event.preventDefault();

        this.addItemService.deleteData(this.props.obj._id);
    }

    render() {
        return (
            <tr>
              <td>

                <a className = "btn btn-primary"><Link to={"edit/"+this.props.obj._id} className="fa fa-pencil">Edit</Link> </a>

                <a className="btn btn-danger"  onClick={this.handleSubmit}
                ><em className="fa fa-trash"></em></a>


              </td>
                <td>
                  {this.props.obj.title}
                </td>
              <td>
                {this.props.obj.description}
              </td>
              <td>
                {this.props.obj.resources}
              </td>
              <td>
                {this.props.obj.classlevel}
              </td>
              <td>
                {this.props.obj.subject}
              </td>


            </tr>
        );
    }
}

export default TableRow;
