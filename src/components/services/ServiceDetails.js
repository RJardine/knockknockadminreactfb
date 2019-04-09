import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class ServiceDetails extends Component {
  // delete service
  onDeleteClick = e => {
    const { firestore, job, history } = this.props;

    firestore
      .delete({ collection: "jobType", doc: job.id })
      .then(history.push("/"));
  };
  render() {
    const { job } = this.props;
    if (job) {
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
                <Link to={`/job/edit/${job.id}`} className="btn btn-dark">
                  Edit
                </Link>
                <button onClick={this.onDeleteClick} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <div className="card-header">{job.type}</div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Service ID <span className="text-secondary">{job.id}</span>{" "}
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">Est Time: {job.time} hours </h3>
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
                    value={job.type}
                  />
                </div>
                {/* location */}
                <div className="form-group">
                  <label htmlFor="type">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={job.location}
                  />
                </div>
                {/* price */}
                <div className="form-group">
                  <label htmlFor="price">Price £</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={job.price}
                  />
                </div>
                {/* description */}
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    readOnly
                    value={job.description}
                  />
                </div>
                {/* image */}
                <div className="form-group">
                  <label htmlFor="image">ImageURL</label>
                  <textarea
                    type="text"
                    className="form-control"
                    readOnly
                    value={job.image}
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

ServiceDetails.propTypes = {
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
)(ServiceDetails);
