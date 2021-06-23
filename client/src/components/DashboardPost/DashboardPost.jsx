import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useRouteMatch } from "react-router-dom";
import { getPostApi } from "../../api/apicall";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import Post from "../Post/Post";

const DashboardPost = ({ currentUser }) => {
  const [post, setPost] = useState(null);
  const { params } = useRouteMatch();

  const refresh = async () => {
    const [error, result] = await getPostApi(currentUser.token, params.postId);

    if (error) {
      console.log(error);
    } else {
        console.log(result);
      setPost(result.content.post);
    }
  };

  useEffect(() => {
    const getPostFromApi = async () => {
      const [error, result] = await getPostApi(
        currentUser.token,
        params.postId
      );


      if (error) {
        console.log(error);
      } else {
        setPost(result.content.post);
      }
    };

    getPostFromApi();
  }, [currentUser, params, setPost]);

  return (post ? (<Post post={post} refresh={refresh} />) : null);
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(DashboardPost);
