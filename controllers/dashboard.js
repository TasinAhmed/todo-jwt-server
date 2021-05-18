const db = require("../db");

exports.getData = async (req, res) => {
  try {
    // const user = (
    //   await db.query("SELECT user_name FROM users WHERE user_id = $1;", [
    //     req.user.user_id,
    //   ])
    // ).rows[0];

    const userName = (
      await db.query("SELECT user_name FROM users WHERE user_id = $1;", [
        req.user.user_id,
      ])
    ).rows[0].user_name;

    const todos = (
      await db.query("SELECT * FROM todos WHERE user_id = $1;", [
        req.user.user_id,
      ])
    ).rows;

    res.json({ userName, todos });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server error");
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedTodo = (
      await db.query(
        "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *;",
        [description, id, req.user.user_id]
      )
    ).rows[0];
    res.status(200).json(updatedTodo);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description) {
      throw new Error("Invalid description");
    }

    const newTodo = (
      await db.query(
        "INSERT INTO todos (user_id,description) VALUES ($1,$2) RETURNING *;",
        [req.user.user_id, description]
      )
    ).rows[0];

    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(409);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = (
      await db.query(
        "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *;",
        [id, req.user.user_id]
      )
    ).rows[0];
    console.log(deletedTodo);
    res.status(200).json(deletedTodo);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(400);
  }
};
