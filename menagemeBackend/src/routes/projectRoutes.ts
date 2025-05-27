import express, { Router, RequestHandler } from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController";

const router: Router = express.Router();

router.get("/", getAllProjects as RequestHandler);
router.get("/:id", getProjectById as RequestHandler);
router.post("/", createProject as RequestHandler);
router.put("/:id", updateProject as RequestHandler);
router.delete("/:id", deleteProject as RequestHandler);

export default router;
