import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Form, Col, Button } from "react-bootstrap";
import { addPostApi } from "../../api/apicall";
import useForm from "../../hooks/useForm";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import Post from "../Post/Post";

const DashboardAddPost = ({ currentUser }) => {
  const [
    value,
    handleChange,
    formError,
    handleError,
    clearValue,
    clearError,
    formMessage,
    setFormMessage,
  ] = useForm({});

  const [displayPost, setDisplayPost] = useState(false);
  const [post, setPost] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setPost({});
    setFormMessage("");

    const [error, result] = await addPostApi(currentUser.token, value.postLink);
    if (error) {
      const errorData = error?.response?.data?.content;

      handleError(
        "form",
        errorData.error ? errorData.error : errorData.message
      );
    } else {
      setFormMessage(result.info);
      setPost(result.content.post);
      setDisplayPost(true);
      clearValue();
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Form onSubmit={onSubmit}>
          <Form.Row className="justify-content-center align-items-end">
            <Form.Group as={Col} md="10" className="mb-0">
              <Form.Label>Post Link</Form.Label>
              <Form.Control
                type="text"
                name="postLink"
                placeholder="Enter Post Link"
                value={value.postLink || ""}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-color-accent-danger">
                {formError.postLink}
              </Form.Text>
            </Form.Group>
            <Form.Group as={Col} md="2" className="mb-0">
              <Button variant="color-major" type="submit" className="mb-1">
                Add Post
              </Button>
            </Form.Group>
          </Form.Row>
          <Form.Group className="mb-0">
            <Form.Text className="text-color-accent-danger">
              {formError.form}
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Text className="text-color-accent-success">
              {formMessage}
            </Form.Text>
          </Form.Group>
        </Form>
      </div>
      {displayPost ? <Post post={post} /> : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(DashboardAddPost);
