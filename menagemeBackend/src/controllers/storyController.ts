import { Request, Response } from "express";
import StoryModel from "../models/storyModel";

// GET /stories
export const getAllStories = async (req: Request, res: Response) => {
  try {
    const stories = await StoryModel.find();
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stories" });
  }
};

// GET /stories/:id
export const getStoryById = async (req: Request, res: Response) => {
  try {
    const story = await StoryModel.findById(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch story" });
  }
};

// POST /stories
export const createStory = async (req: Request, res: Response) => {
  try {
    const { name, description, priority, projectId, createDate, state, owner } =
      req.body;

    const newStory = new StoryModel({
      name,
      description,
      priority,
      projectId,
      createDate,
      state,
      owner,
    });

    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    res.status(500).json({ message: "Failed to create story" });
  }
};

// PUT /stories/:id
export const updateStory = async (req: Request, res: Response) => {
  try {
    const { name, description, priority, projectId, createDate, state, owner } =
      req.body;

    const updatedStory = await StoryModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        priority,
        projectId,
        createDate,
        state,
        owner,
      },
      { new: true }
    );

    if (!updatedStory)
      return res.status(404).json({ message: "Story not found" });

    res.json(updatedStory);
  } catch (error) {
    res.status(500).json({ message: "Failed to update story" });
  }
};

// DELETE /stories/:id
export const deleteStory = async (req: Request, res: Response) => {
  try {
    const deletedStory = await StoryModel.findByIdAndDelete(req.params.id);
    if (!deletedStory)
      return res.status(404).json({ message: "Story not found" });

    res.json({ message: "Story deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete story" });
  }
};
