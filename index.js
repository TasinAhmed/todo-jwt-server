const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/jwtAuth");
const dashboardRoute = require("./routes/dashboard");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

app.use("/auth", authRoute);
app.use("/dashboard", dashboardRoute);

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);
