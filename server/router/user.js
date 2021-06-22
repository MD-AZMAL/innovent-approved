const express = require("express");
const router = express.Router();
const routeNames = require("../utils/routeNames");
const checkClientParams = require("../middleware/checkClientParams");
const { signup, login } = require("../controller/authentication");

router.use(express.urlencoded({ extended: true }));

router.post(routeNames.signup, checkClientParams, async (req, res) => {
  let statusCode;
  let responseObject;

  try {
    const result = await signup(req.body);

    statusCode = 200;
    responseObject = {
      success: true,
      route: req.route.path,
      info: "registered Successfully",
      content: result,
    };
  } catch (error) {
    statusCode = 400;
    responseObject = {
      success: false,
      route: req.route.path,
      info: null,
      error: "Error while signing up",
      content: error,
    };
  }
  res.status(statusCode).send(responseObject);
});

router.post(routeNames.login, checkClientParams, async (req, res) => {
  let statusCode;
  let responseObject;

  try {
    const result = await login(req.body);

    statusCode = 200;
    responseObject = {
      success: true,
      route: req.route.path,
      info: "login Successfully",
      content: result,
    };
  } catch (error) {
    statusCode = 400;
    responseObject = {
      success: false,
      route: req.route.path,
      info: null,
      error: "Error while signing up",
      content: error,
    };
  }

  res.status(statusCode).send(responseObject);
});

module.exports = router;