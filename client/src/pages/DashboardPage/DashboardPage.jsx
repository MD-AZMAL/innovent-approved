import React from "react";
import DashboardNav from "../../components/DashboardNav/DashboardNav";
import DashboardSidebar from "../../components/DashboardSidebar/DashboardSidebar";

import "./DashboardPage.styles.scss";

const DashboardPage = () => {
  return (
    <div id="dashboard">
      <DashboardSidebar />
      <div id="dashboard-main">
        <DashboardNav />
        <div id="dashboard-content">
          <div className="m-4">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
              eveniet nesciunt dolorem, molestias laudantium accusamus qui ipsam
              tenetur nisi eaque facere commodi quas inventore. Eaque harum
              officiis asperiores debitis placeat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
