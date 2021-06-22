import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";
import PageSection from "../../components/PageSection/PageSection";
import PageWrapper from "../../components/PageWrapper/PageWrapper";

const HomePage = () => {
  return (
    <PageWrapper>
      <PageSection>
        <div className="text-center mb-5">
          <h2 className="text-color-major bold">Let's get started now!</h2>
          <p className="text-muted">
            Or <Link to="/register">Create Account</Link> if not registered yet
          </p>
        </div>
        <Container>
          <Row className="justify-content-center">
            <Col lg="7" >
              <LoginForm />
            </Col>
          </Row>
        </Container>
      </PageSection>
    </PageWrapper>
  );
};

export default HomePage;