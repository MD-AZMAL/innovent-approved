import React from "react";
import classNames from 'classnames';
import { Link } from "react-router-dom";

import "./DashboardItem.styles.scss";

const DashboardItem = ({ item, isActive }) => {

  const dashboardClasses = classNames("dashboard-item", {"dashboard-item--active": isActive})

  return (
    <Link to={item.path} className={dashboardClasses}>
        <span className="dashboard-item--icon">
            {item.icon}
        </span>
      <span className="dashboard-item--label">{item.title}</span>
    </Link>
  );
};

export default DashboardItem;
