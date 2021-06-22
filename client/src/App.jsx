import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";
import DSMPage from "./pages/DSMPage/DSMPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

import "./App.scss";

const App = ({ currentUser }) => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            currentUser ? <Redirect to="/dashboard" /> : <HomePage />
          }
        />
        <Route
          path="/dashboard"
          render={() => (currentUser ? <DashboardPage /> : <Redirect to="/" />)}
        />
         <Route
          exact
          path="/register"
          render={() =>
            currentUser ? <Redirect to="/dashboard" /> : <RegisterPage />
          }
        />
        <Route exact path="/dsm" component={DSMPage} />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
