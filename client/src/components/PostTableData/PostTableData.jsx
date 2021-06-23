import React from "react";
import { Badge } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const PostTableData = ({ _id, title, status }) => {
  const { pathname } = useLocation();

  return (
    <tr>
      <td colSpan="8">
        <Link to={`${pathname}/${_id}`}>{title}</Link>
      </td>
      <td className="text-center">
        {status.levelOne === 0 ? (
          <h5>
            <Badge variant="color-accent-warning">pending</Badge>
          </h5>
        ) : status.levelOne === 1 ? (
          <h5>
            <Badge variant="color-accent-success">Approved</Badge>
          </h5>
        ) : status.levelOne === -1 ? (
          <h5>
            <Badge variant="color-accent-danger">Rejected</Badge>
          </h5>
        ) : null}
      </td>
      <td className="text-center">
        {status.levelTwo === 0 && status.levelOne !== -1 ? (
          <h5>
            <Badge variant="color-accent-warning" size="lg" className="ml-2">
              Pending
            </Badge>
          </h5>
        ) : status.levelTwo === 1 ? (
          <h5>
            <Badge variant="color-accent-success" className="ml-2">
              Approved
            </Badge>
          </h5>
        ) : status.levelTwo === -1 || status.levelOne === -1 ? (
          <h5>
            <Badge variant="color-accent-danger" className="ml-2">
              Rejected
            </Badge>
          </h5>
        ) : null}
      </td>
    </tr>
  );
};

export default PostTableData;
