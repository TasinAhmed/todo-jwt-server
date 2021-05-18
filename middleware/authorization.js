require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token === "null") {
      res.sendStatus(401);
      return false;
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(403).json("Not Authorized");
  }
};
