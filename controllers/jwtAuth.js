const db = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

const saltRounds = 10;

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash password
    const hashedPass = await bcrypt.hash(password, saltRounds);

    const newUser = (
      await db.query(
        "INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *;",
        [name, email, hashedPass]
      )
    ).rows[0];

    const token = jwtGenerator(newUser.user_id);

    res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    if (error.constraint == "users_user_email_key") {
      // If user email already in use
      res.status(409).send("User with specified email already exists");
    } else {
      // Otherwise
      res.status(500).send("Unable to register");
    }
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = (
      await db.query("SELECT * FROM users WHERE user_email = $1;", [email])
    ).rows[0];

    if (user) {
      const isPassCorrect = await bcrypt.compare(password, user.user_password);

      if (isPassCorrect) {
        const token = jwtGenerator(user.user_id);

        res.status(200).json({ token });
      } else {
        res.status(401).send("Invalid email or password");
      }
    } else {
      res.status(404).send("User does not exist");
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Unable to login");
  }
};

exports.isVerify = async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Unable to login");
  }
};
