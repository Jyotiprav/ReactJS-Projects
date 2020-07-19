import React from 'react';
// To send HTTP request to our back-end, import axios
import axios from 'axios';

export default class CreateContact extends React.Component {
    // ============constructor=========
    constructor(props) {
        super(props);
        // state or variables of the class
        this.state = {
            contact_name: '',
            contact_number: '',
            contact_type:''
        }
    }
    // ======function to update the value of state with input fields=========
    onChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }
    // ==============Submit function attached with the form=============
    mySubmitHandler = (event) => 
    {
        event.preventDefault();
        // print the result on console
        console.log(`Form submitted:`);
        console.log(`Contact Name: ${this.state.contact_name}`);
        console.log(`Contact Number: ${this.state.contact_number}`);
        console.log(`Contact Type: ${this.state.contact_type}`);
        // create a new contact
        const newContact = {
            contact_name: this.state.contact_name,
            contact_number:this.state.contact_number,
            contact_type: this.state.contact_type
        };
        // Connect with backend
        axios.post('http://localhost:4000/add', newContact)
            .then(res => console.log(res.data));
        // After submission set the state to empty again   
        this.setState({
            contact_name: '',
            contact_number: '',
            contact_type: ''
        })
        this.props.history.push('/');//load the home page
        window.location.reload(); //refresh the page
    }
    // ========render function for the component==========
    render() {
        return (
            <div class="container">
                <h3>Create New Contact</h3>
                <form onSubmit={this.mySubmitHandler}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control w-50"
                                name="contact_name"
                                value={this.state.contact_name}
                                onChange={this.onChangeHandler}
                                />
                    </div>
                    <div className="form-group">
                        <label>Phone Number: </label>
                        <input 
                                type="text" 
                                className="form-control w-50"
                                name="contact_number"
                                value={this.state.contact_number}
                                onChange={this.onChangeHandler}
                                />
                    </div>
                    <div className="form-group">
                        <label>Contact Type(Friend, Work or Home) </label>
                        <input 
                                type="text" 
                                className="form-control w-50"
                                name="contact_type"
                                value={this.state.contact_type}
                                onChange={this.onChangeHandler}
                                />
                    </div>
                    <div className="form-group">
                        <button type="submit" >Add Contact</button>
                    </div>
                </form>
            </div>
        )
    }
}