import { Request, Response } from "express";
import ProjectModel from "../models/projectModel";

// GET /projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectModel.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

// GET /projects/:id
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await ProjectModel.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch project" });
  }
};

// POST /projects
export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const newProject = new ProjectModel({ name, description });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Failed to create project" });
  }
};

// PUT /projects/:id
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!updatedProject)
      return res.status(404).json({ message: "Project not found" });
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: "Failed to update project" });
  }
};

// DELETE /projects/:id
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const deleted = await ProjectModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete project" });
  }
};
