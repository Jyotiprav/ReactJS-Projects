import React from "react";
// import bootstrap CSS file
import "bootstrap/dist/css/bootstrap.min.css";
// import reuired pkg for Router
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import custom style sheet
import "./App.css"

// import components
import CreateContact from "./components/create-contact";
import EditContact from "./components/edit-contact";
import ContactList from "./components/contact-list";
import DeleteContact from "./components/delete-contact";

// Create the Component
class App extends React.Component {
  render() {
    return (
        <Router>
          {/* Create a bootstrap navigation bar */}
          <nav className="navbar navbar-expand-lg bg-dark text-white navbar-dark">
            <Link to="/" className="navbar-brand">MERN-Contact Book App</Link>
            <div className="collpase navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">View Contacts</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Contact</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          {/* Component Section */}
          <div className="container">
          <Route path="/" exact component={ContactList} />
          <Route path="/edit/:id" component={EditContact} />
          <Route path="/create" component={CreateContact} />
          <Route path="/delete/:id" component={DeleteContact} />
          </div>
        </Router>
        
      
    );
  }
}

export default App;

