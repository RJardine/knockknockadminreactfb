import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class ClientDetails extends Component {
  render() {
    const { user } = this.props;
    if (user) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/clients">
                <i className="fas fa-arrow-circle-left" /> Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right" />
            </div>
          </div>
          <hr />
          <div className="card">
            <div className="card-header">{user.type}</div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    User ID <span className="text-secondary">{user.id}</span>{" "}
                  </h4>
                </div>
                {/* <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right"> {user.name} </h3>
                </div> */}
              </div>
              <hr />
              <form>
                {/* name */}
                <div className="form-group">
                  <label htmlFor="name">Full Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={user.name + " " + user.surname}
                    readOnly
                  />
                </div>
                {/* location */}
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={user.email}
                  />
                </div>
                {/* phone */}
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={user.phone}
                    readOnly
                  />
                </div>
                {/*Address */}
                <div className="form-group">
                  <label htmlFor="phone">Address:</label>
                  <textarea
                    rows="3"
                    type="text"
                    className="form-control"
                    value={
                      user.address +
                      " " +
                      user.street +
                      "\n" +
                      user.city +
                      " \n" +
                      user.zipcode
                    }
                    readOnly
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="offset-md-6 col-md-3">
          <div
            className="spinner-border text-primary"
            style={{ width: "10rem", margin: "center", height: "10rem" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }
  }
}

ClientDetails.propTypes = {
  firestore: PropTypes.object.isRequired,
  users: PropTypes.array
};

export default compose(
  firestoreConnect(props => [
    { collection: "users", storeAs: "user", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    user: ordered.user && ordered.user[0]
  }))
)(ClientDetails);
