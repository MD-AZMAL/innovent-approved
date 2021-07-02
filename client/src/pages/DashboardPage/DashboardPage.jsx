import React from "react";
import { Switch, useRouteMatch, Route, Redirect } from "react-router-dom";
import DashboardAddPost from "../../components/DashboardAddPost/DashboardAddPost";
import DashboardAPI from "../../components/DashboardAPI/DashboardAPI";
import DashboardNav from "../../components/DashboardNav/DashboardNav";
import DashboardPost from "../../components/DashboardPost/DashboardPost";
import DashboardPosts from "../../components/DashboardPosts/DashboardPosts";
import DashboardSidebar from "../../components/DashboardSidebar/DashboardSidebar";

import "./DashboardPage.styles.scss";

const DashboardPage = () => {
  const { path } = useRouteMatch();

  return (
    <div id="dashboard">
      <DashboardSidebar />
      <div id="dashboard-main">
        <DashboardNav />
        <div id="dashboard-content">
          <Switch>
            <Route exact path={path} render={() => <Redirect to={`${path}/posts`} />} />
            <Route exact path={`${path}/posts`} component={DashboardPosts} />
            <Route exact path={`${path}/api`} component={DashboardAPI} />
            <Route
              exact
              path={`${path}/add-post`}
              component={DashboardAddPost}
            />
            <Route
              exact
              path={`${path}/posts/:postId`}
              component={DashboardPost}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
