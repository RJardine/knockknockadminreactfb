import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from "prop-types";

class Navbar extends Component {
  // state
  state = {
    isAuthenticated: true,
    isNotAuthenticated: true
  };

  // get derived state from props
  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  // onlogout Click
  onLogoutClick = e => {
    e.preventDefault();

    const { firebase } = this.props;
    firebase.logout();
  };
  render() {
    const { isAuthenticated } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
          <div className="container">
            <Link to="/" className="navbar-brand">
              <img
                id="brand-image"
                src={require("./images/LogoV4.png")}
                alt="Home"
                width="30"
                height="30"
              />{" "}
              Knock Knock Services
            </Link>
            <button
              type="button"
              data-toggle="collapse"
              data-target="#navbarMain"
              className="navbar-toggler"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarMain">
              {isAuthenticated ? (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to="/clients" className="nav-link">
                      Clients
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/bookings" className="nav-link">
                      Bookings
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      href="#!"
                      className="nav-link"
                      onClick={this.onLogoutClick}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              ) : (
                // is Logged Out links
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

// proptypes
Navbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Navbar);
