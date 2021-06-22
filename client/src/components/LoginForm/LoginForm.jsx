import React from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { loginApi } from "../../api/apicall";
import useForm from "../../hooks/useForm";
import { setCurrentUser } from "../../redux/user/user.actions";

const LoginForm = ({ setCurrentUser }) => {
  const [value, handleChange, formError, handleError, clearValue, clearError] =
    useForm({ role: "User" });

  const onSubmit = async (e) => {
    e.preventDefault();

    const { email, role, password } = value;

    const [error, result] = await loginApi({ email, role, password });

    if (error) {
      const errorData = error?.response?.data?.content;

      clearError();

      switch (errorData?.errorCode) {
        case 0:
          handleError("form", `Missing : ${errorData.message.join(", ")}`);
          break;
        case 1:
        case 2:
          handleError("form", errorData.message);
          break;
        case 4:
          handleError("email", errorData.message);
          break;
        case 5:
          handleError("role", errorData.message);
          break;
        case 6:
          handleError("password", errorData.message);
          break;
        default:
          handleError("form", "Error while submitting");
          break;
      }
    } else {
      clearError();
      clearValue();
      setCurrentUser(result.content.user);
    }
  };

  return (
    <Form onSubmit={onSubmit} className="p-4 border shadow bg-white">
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={value.email || ""}
          onChange={handleChange}
          required
        />
        <Form.Text className="text-color-accent-danger">{formError.email}</Form.Text>
      </Form.Group>

      <Form.Group>
        <Form.Label>Role</Form.Label>
        <Form.Control
          as="select"
          name="role"
          value={value.role || "User"}
          onChange={handleChange}
          required
        >
          <option>User</option>
          <option>Admin</option>
        </Form.Control>
        <Form.Text className="text-color-accent-danger">{formError.role}</Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={value.password || ""}
          onChange={handleChange}
          required
        />
        <Form.Text className="text-color-accent-danger">
          {formError.password}
        </Form.Text>
      </Form.Group>

      <Form.Group className="text-center">
        <Form.Text className="text-color-accent-danger'">{formError.form}</Form.Text>
      </Form.Group>

      <div className="text-center">
        <Button variant="color-major" type="submit" block>
          Submit
        </Button>
      </div>
    </Form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(LoginForm);
