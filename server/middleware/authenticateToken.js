const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    res.status(401).send({
      success: false,
      route: req.route.path,
      info: null,
      error: "Error No Token",
      content: { errorCode: 111, message: "No token provided", error: null },
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      res.status(403).send({
        success: false,
        route: req.route.path,
        info: null,
        error: "Error Invalid Token",
        content: { errorCode: 112, message: "Invalid Token", error: err },
      });

      req.user = user;
    next();
  });
};

module.exports = authenticateToken;
