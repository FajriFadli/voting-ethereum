import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Activate from "./components/auth/Activate";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import AdminPanel from "./components/dashboard/AdminPanel";
import PrivateRoute from "./components/routing/PrivateRoute";
import Register from "./components/auth/Register";
import Landing from "./components/layout/Landing";
import Hasil from "./components/layout/Hasil";
import Instruksi from "./components/layout/Instruksi";
import { Provider } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { loadUser } from "./actions/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/activate" component={Activate} />
              <Route exact path="/hasil" component={Hasil} />
              <Route exact path="/instruksi" component={Instruksi} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/adminpanel" component={AdminPanel} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
