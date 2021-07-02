import React from "react";
import { Badge } from "react-bootstrap";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { nanoid } from "nanoid";
import { useLocation } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import DashboardItem from "../DashboardItem/DashboardItem";

import "./DashboardSidebar.styles.scss";

const DashboardSidebar = ({ currentUser }) => {
  const { pathname } = useLocation();

  const items = [
    {
      title: "Show Posts",
      icon: <FaIcons.FaList />,
      path: "/dashboard/posts",
    },
    {
      title: "Add Post",
      icon: <FaIcons.FaPlusSquare />,
      path: "/dashboard/add-post",
    },
    {
      title: "API Keys",
      icon: <FaIcons.FaExternalLinkAlt />,
      path: "/dashboard/api",
    },
  ];

  return (
    <div className="dashboard-sidebar">
      <div className="text-center py-5">
        <h6 className="mb-0">Welcome</h6>
        <h5>{currentUser.name}</h5>
        {currentUser.role === "Admin" ? (
          <Badge variant="color-minor" className="ml-2">
            Admin
          </Badge>
        ) : null}
      </div>
      <div className="dashboard-sidebar--wrapper">
        {items.map((item) => (
          <DashboardItem
            key={nanoid()}
            item={item}
            isActive={pathname.includes(item.path)}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(DashboardSidebar);
