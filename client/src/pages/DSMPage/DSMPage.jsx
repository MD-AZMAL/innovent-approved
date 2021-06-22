import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { setCurrentUserNull } from "../../redux/user/user.actions";

const DSMPage = ({ setCurrentUserNull }) => {
  return (
    <Container className="p-4">
      <Button variant="color-accent-danger" onClick={setCurrentUserNull}>
        setUserNull
      </Button>
      <Row>
        <Col>
          {/* <h1 className="display">Display</h1> */}
          <h1>Heading 1</h1>
          <h2>Heading 2</h2>
          <h3>Heading 3</h3>
          <h4>Heading 4</h4>
          <h5>Heading 5</h5>
          <h6>Heading 6</h6>

          <p className="mt-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A adipisci
            dolores molestiae aut eveniet, ad recusandae. Illo cum iure
            dignissimos eius suscipit voluptas incidunt cumque laborum repellat,
            labore totam ex.
          </p>
          <p className="mt-4 text-color-grey">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A adipisci
            dolores molestiae aut eveniet, ad recusandae. Illo cum iure
            dignissimos eius suscipit voluptas incidunt cumque laborum repellat,
            labore totam ex.
          </p>
        </Col>

        <Col>
          {/* <h1 className="display uppercase">Display</h1> */}
          <h1 className="uppercase">Heading 1</h1>
          <h2 className="uppercase">Heading 2</h2>
          <h3 className="uppercase">Heading 3</h3>
          <h4 className="uppercase">Heading 4</h4>
          <h5 className="uppercase">Heading 5</h5>
          <h6 className="uppercase">Heading 6</h6>

          <p className="mt-4 uppercase">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A adipisci
            dolores molestiae aut eveniet, ad recusandae. Illo cum iure
            dignissimos eius suscipit voluptas incidunt cumque laborum repellat,
            labore totam ex.
          </p>

          <p className="mt-4 uppercase text-color-grey">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A adipisci
            dolores molestiae aut eveniet, ad recusandae. Illo cum iure
            dignissimos eius suscipit voluptas incidunt cumque laborum repellat,
            labore totam ex.
          </p>
        </Col>
      </Row>
      <div className="mt-4">
        <Row>
          <Col md="6" className="mb-4">
            <Button variant="color-major" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="color-minor" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="color-accent-danger" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="color-accent-warning" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="color-accent-success" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="color-dark" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="color-grey" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="color-white" size="lg" className="mr-2">
              Button
            </Button>
          </Col>
          <Col md="7">
            <Button variant="outline-color-major" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-minor" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-accent-danger" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-accent-warning" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-accent-success" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-dark" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-grey" size="lg" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-white" size="lg" className="mr-2">
              Button
            </Button>
          </Col>
        </Row>
      </div>
      <div className="mt-4">
        <Row>
          <Col md="6" className="mb-4">
            <Button variant="color-major" className="mr-2">
              Button
            </Button>
            <Button variant="color-minor" className="mr-2">
              Button
            </Button>
            <Button variant="color-accent-danger" className="mr-2">
              Button
            </Button>
            <Button variant="color-accent-warning" className="mr-2">
              Button
            </Button>
            <Button variant="color-accent-success" className="mr-2">
              Button
            </Button>
            <Button variant="color-dark" className="mr-2">
              Button
            </Button>
            <Button variant="color-grey" className="mr-2">
              Button
            </Button>
            <Button variant="color-white" className="mr-2">
              Button
            </Button>
          </Col>
          <Col md="7">
            <Button variant="outline-color-major" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-minor" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-accent-danger" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-accent-warning" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-accent-success" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-dark" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-grey" className="mr-2">
              Button
            </Button>
            <Button variant="outline-color-white" className="mr-2">
              Button
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUserNull: () => dispatch(setCurrentUserNull()),
});

export default connect(null, mapDispatchToProps)(DSMPage);
