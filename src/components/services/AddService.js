import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class AddService extends Component {
  state = {
    type: "",
    location: "Luton",
    price: "",
    description: "",
    time: "",
    Image: ""
  };
  // onchange
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  // onSubmit
  onSubmit = e => {
    e.preventDefault();
    const newService = this.state;
    const { firestore, history } = this.props;

    firestore.add({ collection: "jobType" }, newService).then(() => {
      history.push("/");
    });
  };
  render() {
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
          <div className="card-header text-center">Add Service</div>
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
                  onChange={this.onChange}
                  defaultValue={this.state.type}
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
                  // onChange={this.onChange}
                  value={this.state.location}
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
                  onChange={this.onChange}
                  defaultValue={this.state.price}
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
                  onChange={this.onChange}
                  defaultValue={this.state.description}
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
                  onChange={this.onChange}
                  defaultValue={this.state.time}
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
                  onChange={this.onChange}
                  defaultValue={this.state.image}
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
  }
}

AddService.propTypes = {
  firestore: PropTypes.object.isRequired
};
export default firestoreConnect()(AddService);
