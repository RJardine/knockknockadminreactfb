import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";

class Contactus extends Component {
  render() {
    const { contactus } = this.props;
    if (contactus) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              {/* table of clients */}
              <h2>
                <i className="fas fa-tools" /> Contact Us Messages
              </h2>
            </div>
            <div className="col-md-6" />
            <table className="table table-hover">
              <thead className="thead-inverse">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {contactus.map(contact => (
                  <tr key={contact.id}>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{moment(contact.createdAt.toDate()).calendar()}</td>
                    <td>
                      <Link
                        to={`/contact/${contact.id}`}
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

Contactus.propTypes = {
  firestore: PropTypes.object.isRequired,
  contactus: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "contactus" }]),
  connect((state, props) => ({
    contactus: state.firestore.ordered.contactus
  }))
)(Contactus);
