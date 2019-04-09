import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class Services extends Component {
  render() {
    const { jobType } = this.props;
    if (jobType) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              {/* table of clients */}
              <h2>
                <i className="fas fa-tools" /> Services
              </h2>
            </div>
            <div className="col-md-6" />
            <table className="table table-hover">
              <thead className="thead-inverse">
                <tr>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {jobType.map(job => (
                  <tr key={job.id}>
                    <td>{job.type}</td>
                    <td>{job.location}</td>
                    <td>£{job.price}</td>
                    <td>
                      <Link
                        to={`/job/${job.id}`}
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

Services.propTypes = {
  firestore: PropTypes.object.isRequired,
  jobType: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: "jobType" }]),
  connect((state, props) => ({
    jobType: state.firestore.ordered.jobType
  }))
)(Services);
