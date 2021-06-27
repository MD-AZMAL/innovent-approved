const express = require("express");
const router = express.Router();
const routeNames = require("../utils/routeNames");
const authenticateToken = require("../middleware/authenticateToken");
const { getApiKeys, generateApiKey } = require("../controller/apiUtils");
const { getPost, getPosts } = require("../controller/postsUtils");

router.use(express.urlencoded({ extended: true }));

router.get(routeNames.getApiKeys, authenticateToken, async (req, res) => {
  let statusCode;
  let responseObject;

  try {
    const result = await getApiKeys(req.user);

    statusCode = 200;
    responseObject = {
      success: true,
      route: req.route.path,
      info: "API keys fetched successfully",
      content: result,
    };
  } catch (error) {
    statusCode = 400;
    responseObject = {
      success: false,
      route: req.route.path,
      info: null,
      error: "Error while requesting",
      content: error.message,
    };
  }
  res.status(statusCode).send(responseObject);
});

router.post(routeNames.generateApiKey, authenticateToken, async (req, res) => {
  let statusCode;
  let responseObject;

  try {
    const result = await generateApiKey(req.user);

    statusCode = 200;
    responseObject = {
      success: true,
      route: req.route.path,
      info: "API key generated successfully",
      content: result,
    };
  } catch (error) {
    statusCode = 400;
    responseObject = {
      success: false,
      route: req.route.path,
      info: null,
      error: "Error while requesting",
      content: error,
    };
  }
  res.status(statusCode).send(responseObject);
});

router.get(routeNames.getPostsByApi, async (req, res) => {
  let statusCode;
  let responseObject;

  try {
    const result = await getPosts(null, req.params.apiKey);

    statusCode = 200;
    responseObject = {
      success: true,
      route: req.route.path,
      info: "Request posted successfully",
      content: result,
    };
  } catch (error) {
    statusCode = 400;
    responseObject = {
      success: false,
      route: req.route.path,
      info: null,
      error: "Error while requesting",
      content: error,
    };
  }
  res.status(statusCode).send(responseObject);
});

router.get(routeNames.getPostByApi, async (req, res) => {
  let statusCode;
  let responseObject;

  try {
    const result = await getPost(req.params.postId, null, req.params.apiKey);

    statusCode = 200;
    responseObject = {
      success: true,
      route: req.route.path,
      info: "Request posted successfully",
      content: result,
    };
  } catch (error) {
    statusCode = 400;
    responseObject = {
      success: false,
      route: req.route.path,
      info: null,
      error: "Error while requesting",
      content: error,
    };
  }
  res.status(statusCode).send(responseObject);
});

module.exports = router;
