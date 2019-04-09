import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

class EditService extends Component {
  constructor(props) {
    super(props);
    // refs
    this.typeInput = React.createRef();
    this.locationInput = React.createRef();
    this.priceInput = React.createRef();
    this.descriptionInput = React.createRef();
    this.timeInput = React.createRef();
    this.imageInput = React.createRef();
  }
  // onSubmit
  onSubmit = e => {
    e.preventDefault();
    const { job, firestore, history } = this.props;
    // updated job
    const updService = {
      type: this.typeInput.current.value,
      location: this.locationInput.current.value,
      price: this.priceInput.current.value,
      description: this.descriptionInput.current.value,
      time: this.timeInput.current.value,
      image: this.imageInput.current.value
    };
    // update service to store
    firestore
      .update({ collection: "jobType", doc: job.id }, updService)
      .then(history.push("/"));
  };
  render() {
    const { job } = this.props;
    if (job) {
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
            <div className="card-header text-center">Edit {job.type}</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                {/* type */}
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <input
                    type="text"
                    className="form-control"
                    name="type"
                    minLength="2"
                    required
                    defaultValue={job.type}
                    ref={this.typeInput}
                  />
                </div>
                {/* location */}
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    readOnly
                    defaultValue={job.location}
                    ref={this.locationInput}
                  />
                </div>
                {/* price */}
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    minLength="2"
                    required
                    defaultValue={job.price}
                    ref={this.priceInput}
                  />
                </div>
                {/* description */}
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="description"
                    minLength="2"
                    required
                    defaultValue={job.description}
                    ref={this.descriptionInput}
                  />
                </div>
                {/* time */}
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    className="form-control"
                    name="time"
                    minLength="2"
                    required
                    defaultValue={job.time}
                    ref={this.timeInput}
                  />
                </div>
                {/* image */}
                <div className="form-group">
                  <label htmlFor="image">ImageURL</label>
                  <input
                    type="text"
                    className="form-control"
                    name="image"
                    minLength="2"
                    required
                    defaultValue={job.image}
                    ref={this.imageInput}
                  />
                </div>
                <input
                  type="Submit"
                  defaultValue="Submit"
                  className="btn btn-primary btn-block"
                />
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

EditService.propTypes = {
  firestore: PropTypes.object.isRequired,
  jobType: PropTypes.array
};

export default compose(
  firestoreConnect(props => [
    { collection: "jobType", storeAs: "job", doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    job: ordered.job && ordered.job[0]
  }))
)(EditService);
