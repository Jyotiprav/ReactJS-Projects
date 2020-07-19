import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

// =========create a function component Contacts with displaye requirements for one table row========


// ==========Component definition======================
export default class DeleteContact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {contacts: []};
        // to use the id from props(Link)
        this.deleteContact = this.deleteContact.bind(this);
    }

    // =============Load the data from backend using following function=========
    deleteContact(e) {
        e.preventDefault();
        axios.post('http://localhost:4000/delete/'+this.props.match.params.id)
            .then(response => {
                
            })
            .catch(function (error){
                console.log(error);
            })
            this.props.history.push('/');
            window.location.reload(); //refresh the page
    }
    
    

    // =========== render function for the component =============
    render() {
        return (
            <div className="container">
                <form onSubmit={this.deleteStudent}>
                <h3>Are you sure?</h3>
                <button type="submit">yes</button>
                <button><Link to={"/"}>No</Link></button>
                </form>
            </div>
        )
    }
}