const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  console.log(req.cookies);

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send("please login first");
  }

  try {
    const decode = jwt.verify(token, process.env.JWTSECRET);
    console.log(decode);
    req.user = decode;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("invalid token");
  }
};

module.exports = auth;
