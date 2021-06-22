import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { setCurrentUserNull } from "../../redux/user/user.actions";

const DashboardNav = ({ setCurrentUserNull }) => {
  const logout = () => {
    setCurrentUserNull();
  };

  return (
    <Navbar bg="light" variant="light" className="shadow" sticky="top">
      <Navbar.Brand className="mr-auto">Innova Approved</Navbar.Brand>
      <Nav>
        <Button variant="color-accent-danger" onClick={logout}>
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUserNull: () => dispatch(setCurrentUserNull()),
});

export default connect(null, mapDispatchToProps)(DashboardNav);
