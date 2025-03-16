const router = require("express").Router();
const Task = require("../models/task");
const authMiddleware = require("../middleware/auth");
const {
  createTask,
  allTasks,
  getTaskById,
  updateTaskById,
  deleteTask,
} = require("../controllers/task");

router.post("/tasks", createTask);
router.get("/tasks", allTasks);
router.get("/tasks/:id", getTaskById);
router.put("/tasks/:id", updateTaskById);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
