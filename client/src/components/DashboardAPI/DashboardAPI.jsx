import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import { nanoid } from "nanoid";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import NotFound from "../NotFound/NotFound";
import { generateApiKeyApi, getApiKeysApi } from "../../api/apicall";

const DashboardAPI = ({ currentUser }) => {
  const [apiKeys, setApiKeys] = useState([]);

  const addApiKeyFromApi = async () => {
      console.log('here');
    let error, result;

    [error, result] = await generateApiKeyApi(currentUser.token);

    if (error) {
      console.log(error);
      return;
    }
   

    [error, result] = await getApiKeysApi(currentUser.token);

    if (error) {
      console.log(error);
    } else {
      setApiKeys(result.content.apiKeys);
    }
  };

  useEffect(() => {
    const getPostsFromApi = async () => {
      const [error, result] = await getApiKeysApi(currentUser.token);

      if (error) {
        console.log(error);
      } else {
        setApiKeys(result.content.apiKeys);
      }
    };

    getPostsFromApi();
  }, [currentUser]);
  return (
    <div>
      <Row>
        <Col>
          <h2>All API Keys</h2>
        </Col>
        <Col>
          <div className="text-right">
            <Button variant="color-major" onClick={addApiKeyFromApi}>
              Add Api Key
            </Button>
          </div>
        </Col>
      </Row>
      <h5 className="text-color-gray">
        API Keys Count : {apiKeys ? apiKeys.length : 0}
      </h5>
      <hr />
      {apiKeys && apiKeys.length !== 0 ? (
        <>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>API Key</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((apiKey, index) => (
                <tr key={nanoid()}>
                  <td>{index + 1}</td>
                  <td>{apiKey}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <NotFound message="No API Keys Available" />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(DashboardAPI);
