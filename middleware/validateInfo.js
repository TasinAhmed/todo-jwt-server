module.exports = (req, res, next) => {
  const { name, email, password } = req.body;

  const validateEmail = (e) => {
    return /^\S+@\S+\.\S+$/.test(e);
  };

  if (req.path === "/register") {
    if (name && email && password) {
      if (validateEmail(email)) {
        next();
      } else {
        res.status(400).send("Invalid Email");
      }
    } else {
      res.status(400).send("Invalid Input");
    }
  } else if (req.path === "/login") {
    if (email && password) {
      next();
    } else {
      res.status(400).json("Invalid Input");
    }
  }
};
