import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// links
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/layout/Dashboard";
import AddClient from "./components/clients/AddClient";
import Services from "./components/services/Services";
import AddService from "./components/services/AddService";
import Clients from "./components/clients/Clients";
import ServiceDetails from "./components/services/ServiceDetails";
import EditService from "./components/services/EditService";
import ClientDetails from "./components/clients/ClientDetails";
import Bookings from "./components/bookings/Bookings";
import BookingsDetails from "./components/bookings/BookingsDetails";
import Login from "./components/auth/Login";
import NotFound from "./components/pages/NotFound";

// redux
import { Provider } from "react-redux";
import store from "./redux/store";

// auth
import {
  UserIsAuthenticated,
  UserIsNotAuthenticated
} from "./redux/helper/auth";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                component={UserIsAuthenticated(Dashboard)}
              />
              {/* clients */}
              <Route
                exact
                path="/client/add"
                component={UserIsAuthenticated(AddClient)}
              />
              <Route
                exact
                path="/client/:id"
                component={UserIsAuthenticated(ClientDetails)}
              />
              <Route
                exact
                path="/clients"
                component={UserIsAuthenticated(Clients)}
              />
              {/* services */}
              <Route
                exact
                path="/services"
                component={UserIsAuthenticated(Services)}
              />
              <Route
                exact
                path="/service/add"
                component={UserIsAuthenticated(AddService)}
              />
              <Route
                exact
                path="/job/:id"
                component={UserIsAuthenticated(ServiceDetails)}
              />
              <Route
                exact
                path="/job/edit/:id"
                component={UserIsAuthenticated(EditService)}
              />
              {/* bookings */}
              <Route
                exact
                path="/bookings"
                component={UserIsAuthenticated(Bookings)}
              />
              <Route
                exact
                path="/book/:id"
                component={UserIsAuthenticated(BookingsDetails)}
              />
              {/* Admin Login */}
              <Route
                exact
                path="/login"
                component={UserIsNotAuthenticated(Login)}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
