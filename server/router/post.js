const express = require("express");
const router = express.Router();
const routeNames = require("../utils/routeNames");
const checkClientParams = require("../middleware/checkClientParams");
const authenticateToken = require("../middleware/authenticateToken");
const {
  getPosts,
  getPost,
  addPost,
  validatePost,
} = require("../controller/postsUtils");

router.use(express.urlencoded({ extended: true }));

router.get(
  routeNames.getPosts,
  checkClientParams,
  authenticateToken,
  async (req, res) => {
    let statusCode;
    let responseObject;

    try {
      const result = await getPosts(req.user);

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
  }
);

router.get(
  routeNames.getPost,
  checkClientParams,
  authenticateToken,
  async (req, res) => {
    let statusCode;
    let responseObject;
    let id = req.params.postId;

    try {
      const result = await getPost(id, req.user);

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
  }
);

router.post(
  routeNames.addPost,
  checkClientParams,
  authenticateToken,
  async (req, res) => {
    let statusCode;
    let responseObject;
    let postLink = req.body.postLink;

    try {
      const result = await addPost(postLink, req.user);

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
  }
);

router.post(
  routeNames.validatePost,
  checkClientParams,
  authenticateToken,
  async (req, res) => {

    let statusCode;
    let responseObject;
    let clientParameters = {...req.body, ...req.params}

    try {
      const result = await validatePost(clientParameters, req.user);

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
  }
);

module.exports = router;
