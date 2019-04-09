import React, { Component } from "react";
import { Link } from "react-router-dom";

class AddClient extends Component {
  state = {
    name: "",
    surname: "",
    email: "",
    phone: ""
  };
  // onchange
  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Dashboard
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Add User</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  name="surname"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.surname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="surname"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.surname}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default AddClient;
