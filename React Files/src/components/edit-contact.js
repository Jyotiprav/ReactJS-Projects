import React from 'react';
import axios from 'axios';

export default class EditContact extends React.Component {

    constructor(props) {
        super(props);
        // state or variables of the class
        this.state = {
            contact_name: '',
            contact_number: '',
            contact_type:''
        }

        this.onChangeContactName = this.onChangeContactName.bind(this);
        this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
        this.onChangeContactType = this.onChangeContactType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    // componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). 
    // Initialization that requires DOM nodes should go here.
    // If you need to load data from a remote endpoint, this is a good place to instantiate 
    // the network request.

    // =============Load the data from backend using following function=========
    componentDidMount() {
        axios.get('http://localhost:4000/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    contact_name: response.data.contact_name,
                    contact_number: response.data.contact_number,
                    contact_type: response.data.contact_type
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    // ======functions to update the values of state with input fields=========

    onChangeContactName(e) {
        this.setState({
            contact_name: e.target.value
        });
    }

    onChangeContactNumber(e) {
        this.setState({
            contact_number: e.target.value
        });
    }

    onChangeContactType(e) {
        this.setState({
            contact_type: e.target.value
        });
    }
    // ==================Submit function for the form===========================
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            contact_name: this.state.contact_name,
            contact_number: this.state.contact_number,
            contact_type: this.state.contact_type
        };
        console.log(obj);
        axios.post('http://localhost:4000/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');//load the home page
        window.location.reload(); //refresh the page
    }
    // ========render function for the component==========
    render() {
        return (
            <div class="container">
                <h3 align="center">Update Contact</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control w-50"
                                value={this.state.contact_name}
                                onChange={this.onChangeContactName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Number: </label>
                        <input 
                                type="text" 
                                className="form-control w-50"
                                value={this.state.contact_number}
                                onChange={this.onChangeContactNumber}
                                />
                    </div>
                    <div className="form-group">
                        <label>Type: </label>
                        <input 
                                type="text" 
                                className="form-control w-50"
                                value={this.state.contact_type}
                                onChange={this.onChangeContactType}
                                />
                    </div>
                    <br />
                    <div className="form-group">
                        <button type="submit">Update Contact</button>
                    </div>
                </form>
            </div>
        )
    }
}