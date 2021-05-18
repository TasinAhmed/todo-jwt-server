const {
  getData,
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/dashboard");
const authorization = require("../middleware/authorization");

const router = require("express").Router();

router.use(authorization);

router.get("/", getData);
router.post("/todos", createTodo);
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);

module.exports = router;
