import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class BookingsDetails extends Component {
  // delete service
  onDeleteClick = e => {
    const { firestore, booking, history } = this.props;

    firestore
      .delete({ collection: "booking", doc: booking.id })
      .then(history.push("/bookings"));
  };
  render() {
    const { booking } = this.props;
    if (booking) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/bookings">
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
            <div className="card-header">{booking.jobType}</div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Booking ID{" "}
                    <span className="text-secondary">{booking.id}</span>{" "}
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    Est Time: {booking.jobTime} hours{" "}
                  </h3>
                </div>
              </div>
              <hr />
              <form>
                {/* type */}
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={booking.jobType}
                  />
                </div>
                {/* location */}
                <div className="form-group">
                  <label htmlFor="type">City</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={booking.city}
                  />
                </div>
                {/* price */}
                <div className="form-group">
                  <label htmlFor="price">Paid £</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={booking.jobPrice}
                  />
                </div>
                {/* name */}
                <div className="form-group">
                  <label htmlFor="name">To User:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      booking.authorFirstName + " " + booking.authorLastName
                    }
                    readOnly
                  />
                </div>
                {/* phone */}
                <div className="form-group">
                  <label htmlFor="phone">Contact Phone:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={booking.phone}
                    readOnly
                  />
                </div>
                {/* email */}
                <div className="form-group">
                  <label htmlFor="email">Contact Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={booking.email}
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

BookingsDetails.propTypes = {
  firestore: PropTypes.object.isRequired,
  bookings: PropTypes.array
};

export default compose(
  firestoreConnect(props => [
    { collection: "bookings", storeAs: "booking", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    booking: ordered.booking && ordered.booking[0]
  }))
)(BookingsDetails);
