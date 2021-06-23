import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { nanoid } from "nanoid";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { getPostsApi } from "../../api/apicall";
import NotFound from "../NotFound/NotFound";
import PostTableData from "../PostTableData/PostTableData";

const DashboardPosts = ({ currentUser }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPostsFromApi = async () => {
      const [error, result] = await getPostsApi(currentUser.token);

      if (error) {
        console.log(error);
      } else {
        setPosts(result.content.posts);
      }
    };

    getPostsFromApi();
  }, [currentUser]);

  return (
    <div>
      {posts && posts.length !== 0 ? (
        <>
          <h2>All posts</h2>
          <h5 className="text-color-gray">Post Count : {posts.length}</h5>
          <hr />
          <Table bordered hover>
            <thead>
              <tr>
                <th colSpan="8">Title</th>
                <th className="text-center">Level 1</th>
                <th className="text-center">Level 2</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(({ _id, title, status }) => (
                <PostTableData
                  key={nanoid()}
                  _id={_id}
                  title={title}
                  status={status}
                />
              ))}
              
            </tbody>
          </Table>
        </>
      ) : (
        <NotFound message="No posts Available" />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(DashboardPosts);
