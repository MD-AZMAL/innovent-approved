import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import DashboardItem from "../DashboardItem/DashboardItem";
import "./DashboardSidebar.styles.scss";

const DashboardSidebar = () => {
  const items = [
    {
      title: "Item 1",
      icon: <FaIcons.FaAccusoft />,
      path: "/",
    },
    {
      title: "Item 2",
      icon: <FaIcons.FaIgloo />,
      path: "/",
    },
    {
      title: "Item 3",
      icon: <FaIcons.FaInbox />,
      path: "/",
    },
    {
      title: "Item 4",
      icon: <FaIcons.FaInvision />,
      path: "/",
    },
  ];

  const [active, setActive] = useState(-1);

  return (
    <div className="dashboard-sidebar">
      <div className="dashboard-sidebar--wrapper">
        {items.map((item, index) => (
          <DashboardItem
            key={index}
            item={item}
            isActive={active === item.title}
            setActive={setActive}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardSidebar;
