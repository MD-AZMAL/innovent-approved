import React from "react";
import { Image } from "react-bootstrap";
import NotFoundIcon from '../../static/icons/box.svg';

import "./NotFound.styles.scss";

const NotFound = ({message}) => {
  return (
    <div className="not-found">
      <div className="not-found--content">
        <Image src={NotFoundIcon} className="img-fluid" />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default NotFound;
