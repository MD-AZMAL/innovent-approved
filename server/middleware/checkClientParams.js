const routeNames = require("../utils/routeNames");

const checkClientParams = (req, res, next) => {
  const missing = [];
  let responseObject;
  switch (req.route.path) {
    case routeNames.signup:
      if (!req.body.firstName) missing.push("firstName");
      if (!req.body.lastName) missing.push("lastName");
      if (!req.body.role) missing.push("role");
      if (!req.body.email) missing.push("email");
      if (!req.body.password) missing.push("password");
      break;
    case routeNames.login:
      if (!req.body.email) missing.push("email");
      if (!req.body.password) missing.push("password");
      if (!req.body.role) missing.push("role");
      break;
    case routeNames.addPost:
      if (!req.body.postLink) missing.push("post link");
      break;
    case routeNames.validatePost:
      if (!req.body.statusCode) missing.push("status code");
      break;
    default:
      break;
  }

  if (missing.length === 0) {
    return next();
  }

  responseObject = {
    success: false,
    route: req.route.path,
    info: null,
    error: "missing client parameters",
    content: { errorCode: 0, message: missing, error: null },
  };

  res.status(400).send(responseObject);
};

module.exports = checkClientParams;
