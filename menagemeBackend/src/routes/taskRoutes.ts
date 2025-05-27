import express, { Router, RequestHandler } from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router: Router = express.Router();

router.get("/", getAllTasks as RequestHandler);
router.get("/:id", getTaskById as RequestHandler);
router.post("/", createTask as RequestHandler);
router.put("/:id", updateTask as RequestHandler);
router.delete("/:id", deleteTask as RequestHandler);

export default router;
