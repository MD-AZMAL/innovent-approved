import React from "react";
import { Container } from "react-bootstrap";
import classNames from "classnames";

const PageSection = ({ bgClass, children, type }) => {
  const sectionClasses = classNames(
    { "p-md-5 p-5": !type },
    { "p-md-4 p-3": type === "sm" },
    {
      [`bg-${bgClass}`]: bgClass,
    }
  );

  return (
    <div className={sectionClasses}>
      <Container>{children}</Container>
    </div>
  );
};

export default PageSection;
