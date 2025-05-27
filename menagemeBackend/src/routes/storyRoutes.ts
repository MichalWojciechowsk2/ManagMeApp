import express, { Router, RequestHandler } from "express";
import {
  createStory,
  getAllStories,
  getStoryById,
  updateStory,
  deleteStory,
} from "../controllers/storyController";

const router: Router = express.Router();

router.post("/", createStory as RequestHandler);
router.get("/", getAllStories as RequestHandler);
router.get("/:id", getStoryById as RequestHandler);
router.put("/:id", updateStory as RequestHandler);
router.delete("/:id", deleteStory as RequestHandler);

export default router;
