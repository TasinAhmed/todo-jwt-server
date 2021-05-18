const { registerUser, loginUser, isVerify } = require("../controllers/jwtAuth");
const validateInfo = require("../middleware/validateInfo");
const authorization = require("../middleware/authorization");

const router = require("express").Router();

// Register user
router.post("/register", validateInfo, registerUser);

// Login user
router.post("/login", validateInfo, loginUser);

// Private route
router.get("/verify", authorization, isVerify);

module.exports = router;
