import React from "react";
import { Badge, Image, Row, Col, Button } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { verifyPostApi } from "../../api/apicall";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import "./Post.styles.scss";

const Post = ({ post, currentUser, refresh }) => {
  const verify = async (statusCode) => {
    const [error] = await verifyPostApi(
      currentUser.token,
      post._id,
      statusCode
    );

    if (error) {
      console.log(error);
    } else if (refresh) {
      refresh();
    }
  };

  const {
    _id,
    title,
    url,
    image,
    description,
    source,
    status,
    requestedBy,
    levelOne,
    levelTwo,
  } = post;

  console.log(post);

  return (
    <div className="post-card">
      <div className="post-card--header">
        <div className="post-card--left">
          <Image
            src={
              image === "Unavailable"
                ? "https://via.placeholder.com/400x225"
                : image
            }
            width="400"
            height="225"
          />
        </div>
        <div className="post-card--right">
          <a target="_blank" href={url} rel="noopener noreferrer">
            <h4 className="text-color-major mb-1">
              {title} <FaIcons.FaExternalLinkSquareAlt />
            </h4>
          </a>
          <p className="text-color-gray small mb-0">Post Id : {_id}</p>

          <div className="post-card--badges">
            {status.levelOne === 0 ? (
              <Badge variant="color-accent-warning">Level 1 pending</Badge>
            ) : status.levelOne === 1 ? (
              <Badge variant="color-accent-success">Level 1 Approved</Badge>
            ) : status.levelOne === -1 ? (
              <Badge variant="color-accent-danger">Level 1 Rejected</Badge>
            ) : null}

            {status.levelTwo === 0 && status.levelOne !== -1 ? (
              <Badge variant="color-accent-warning" size="lg" className="ml-2">
                Level 2 pending
              </Badge>
            ) : status.levelTwo === 1 ? (
              <Badge variant="color-accent-success" className="ml-2">
                Level 2 Approved
              </Badge>
            ) : status.levelTwo === -1 || status.levelOne === -1 ? (
              <Badge variant="color-accent-danger" className="ml-2">
                Level 2 Rejected
              </Badge>
            ) : null}
          </div>
          <p>
            Source :
            <a target="_blank" href={source} rel="noreferrer">
              {source}
            </a>
          </p>
          <p>{description}</p>
          {currentUser.role === "Admin" &&
          status.levelOne !== -1 &&
          status.levelTwo === 0 ? (
            <div className="post-card--actions">
              <Button
                variant="color-accent-danger mr-3"
                onClick={() => verify(-1)}
              >
                Reject
              </Button>
              <Button
                variant="color-accent-success mr-3"
                onClick={() => verify(1)}
              >
                Approve
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      <hr />
      <Row>
        <Col xs="4">
          <div className="pl-4">
            <h4 className="text-color-major">Requested By</h4>
            {requestedBy ? (
              <>
                <h5>
                  {requestedBy.name}
                  {requestedBy.role === "Admin" ? (
                    <Badge variant="color-minor" className="ml-2">
                      Admin
                    </Badge>
                  ) : null}
                </h5>
                <p>{requestedBy.email}</p>
              </>
            ) : (
              <>
                <p className="text-color-gray">Info not available</p>
              </>
            )}
          </div>
        </Col>
        <Col xs="4">
          <div className="post-card--user pl-4">
            <h4 className="text-color-major">Level One </h4>
            {levelOne ? (
              <>
                <h5>
                  {levelOne.name}
                  {levelOne.role === "Admin" ? (
                    <Badge variant="color-minor" className="ml-2">
                      Admin
                    </Badge>
                  ) : null}
                </h5>
                <p>{levelOne.email}</p>
              </>
            ) : (
              <>
                <p className="text-color-gray">Info not available</p>
              </>
            )}
          </div>
        </Col>
        <Col xs="4">
          <div className="post-card--user pl-4">
            <h4 className="text-color-major">Level Two </h4>
            {levelTwo ? (
              <>
                <h5>
                  {levelTwo.name}
                  {levelTwo.role === "Admin" ? (
                    <Badge variant="color-minor" className="ml-2">
                      Admin
                    </Badge>
                  ) : null}
                </h5>
                <p>{levelTwo.email}</p>
              </>
            ) : (
              <>
                <p className="text-color-gray">Info not available</p>
              </>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Post);
