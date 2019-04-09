import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class Bookings extends Component {
  render() {
    const { bookings } = this.props;
    if (bookings) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              {/* table of clients */}
              <h2>
                <i className="fas fa-tools" /> Bookings
              </h2>
            </div>
            <div className="col-md-6" />
            <table className="table table-hover">
              <thead className="thead-inverse">
                <tr>
                  <th>Type</th>
                  <th>Location</th>
                  <th>User</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {bookings.map(book => (
                  <tr key={book.id}>
                    <td>{book.jobType}</td>
                    <td>{book.city}</td>
                    <td>
                      {book.name} {book.surname}
                    </td>
                    <td>
                      <Link
                        to={`/book/${book.id}`}
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

Bookings.propTypes = {
  firestore: PropTypes.object.isRequired,
  bookings: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "bookings" }]),
  connect((state, props) => ({
    bookings: state.firestore.ordered.bookings
  }))
)(Bookings);
