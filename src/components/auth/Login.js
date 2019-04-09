import React, { Component } from "react";
import { compose } from "redux";
import PropTypes from "prop-types";
import { firebaseConnect } from "react-redux-firebase";
import Alert from "../layout/Alert";

class Login extends Component {
  // state
  state = {
    email: "",
    password: "",
    error: false
  };

  // onSubmit
  onSubmit = e => {
    e.preventDefault();

    const { firebase } = this.props;
    const { email, password } = this.state;
    // attempt logins
    firebase
      .login({
        email,
        password
      })
      .then(res => this.setState({ error: false }))
      .catch(err => {
        this.setState({ error: err.message });
        // notifyUser('invalid credentials', 'error')
      });
  };
  // onChange
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { error } = this.state;
    return (
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-body">
              {/*  */}
              {error ? <Alert message={error} messageType={"error"} /> : null}
              <h1 className="text-center pb-4 pt-3">
                <span className="text-secondary">
                  <i className="fas fa-user-shield" /> Admin
                </span>
              </h1>
              {/* form */}
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Admin Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input type="submit" className="btn btn-primary btn-block" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// proptypes
Login.propTypes = {
  firebase: PropTypes.object.isRequired
};

export default compose(firebaseConnect())(Login);
