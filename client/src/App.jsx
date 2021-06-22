import React from "react";
import { Route, Switch } from "react-router-dom";
import DSMPage from "./pages/DSMPage/DSMPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

import "./App.scss";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={DashboardPage} />
        <Route exact path="/dsm" component={DSMPage} />
      </Switch>
    </div>
  );
};

export default App;
