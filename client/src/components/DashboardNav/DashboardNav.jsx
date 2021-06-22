import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";

const DashboardNav = () => {
  return (
    <Navbar bg="light" variant="light" className="shadow" sticky="top">
      <Navbar.Brand className="mr-auto">Innova Approved</Navbar.Brand>
      <Nav>
        <Button variant="color-accent-danger" >
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
};

export default DashboardNav;
