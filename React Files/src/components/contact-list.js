import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

// =========create a function component Contacts with displaye requirements for one table row========
const Contacts = props => (
    <tr>
        <td>{props.contact.contact_name}</td>
        <td>{props.contact.contact_number}</td>
        <td>{props.contact.contact_type}</td>
        <td>
            <Link className="text-success" to={"/edit/"+props.contact._id} style={{paddingRight:20}}><strong>Edit</strong></Link>
            <Link className="text-danger" to={"/delete/"+props.contact._id}><strong>Delete</strong></Link>
            {/* <Button onClick={this.deleteStudent(props.contact._id)}>Delete<> */}
        </td>
    </tr>
)

// ==========Component definition======================
export default class ContactList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {contacts: []};
    }

    // =============Load the data from backend using following function=========
    componentDidMount() {
        axios.get('http://localhost:4000/')
            .then(response => {
                this.setState({ contacts: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    // ======Function to map each row with database value===============
    contactList() {
        return this.state.contacts.map(function(currentContact, i){
            return <Contacts contact={currentContact} key={i} />;
        })
    }

    // =========== render function for the component =============
    render() {
        return (
            <div className="container">
                <h3>Contact List</h3>
                <table className="table" style={{ marginTop: 20,color:"white" ,border:"5px solid white",fontSize:"20px"}} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Number</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.contactList() }
                    </tbody>
                </table>
            </div>
        )
    }
}