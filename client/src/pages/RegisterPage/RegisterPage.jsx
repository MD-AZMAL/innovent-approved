import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import PageSection from "../../components/PageSection/PageSection";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const RegisterPage = () => {
  return (
    <PageWrapper>
      <PageSection>
        <div className="text-center mb-5">
          <h2 className="text-color-major bold">Let's get started now!</h2>
          <p className="text-muted">
            Or <Link to="/">Login to your Account</Link> if you've already
            registered
          </p>
        </div>

        <Container>
          <Row className="justify-content-center">
            <Col lg="7">
              <RegisterForm />
            </Col>
          </Row>
        </Container>
      </PageSection>
    </PageWrapper>
  );
};

export default RegisterPage;
