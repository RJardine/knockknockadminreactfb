import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import moment from "moment";

class ContactusDetails extends Component {
  // delete service
  onDeleteClick = e => {
    const { firestore, contact, history } = this.props;

    firestore
      .delete({ collection: "contactus", doc: contact.id })
      .then(history.push("/"));
  };
  render() {
    const { contact } = this.props;
    if (contact) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/">
                <i className="fas fa-arrow-circle-left" /> Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <button onClick={this.onDeleteClick} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <div className="card-header">{contact.name}</div>
            <div className="card-body">
              <hr />
              <form>
                {/* name */}
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={contact.name}
                  />
                </div>
                {/* email */}
                <div className="form-group">
                  <label htmlFor="type">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={contact.email}
                  />
                </div>
                {/* message */}
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    type="text"
                    className="form-control"
                    readOnly
                    value={contact.message}
                    rows="3"
                  />
                </div>

                {/* time */}
                <div className="form-group">
                  <label htmlFor="image">CreatedAt:</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={moment(contact.createdAt.toDate()).calendar()}
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

ContactusDetails.propTypes = {
  firestore: PropTypes.object.isRequired,
  contactus: PropTypes.array
};

export default compose(
  firestoreConnect(props => [
    { collection: "contactus", storeAs: "contact", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    contact: ordered.contact && ordered.contact[0]
  }))
)(ContactusDetails);
