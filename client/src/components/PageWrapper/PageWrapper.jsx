import React from "react";
import './PageWrapper.styles.scss';

const PageWrapper = ({ children, className }) => {
  return <div className={`page-wrapper ${className}`}>{children}</div>;
};

export default PageWrapper;