import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class Clients extends Component {
  render() {
    const { users } = this.props;
    if (users) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              {/* table of clients */}
              <h2>
                <i className="fas fa-users" /> Clients
              </h2>
            </div>
            <div className="col-md-6" />
            <table className="table table-hover">
              <thead className="thead-inverse">
                <tr>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Email</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.email}</td>
                    <td>
                      <Link
                        to={`/client/${user.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        <i className="fas fa-arrow-circle-right" />
                        expand
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
  users: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "users" }]),
  connect((state, props) => ({
    users: state.firestore.ordered.users
  }))
)(Clients);
