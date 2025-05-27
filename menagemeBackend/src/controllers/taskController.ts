// import { Request, Response } from "express";
// import TaskModel from "../models/taskModel";

// // GET /tasks
// export const getAllTasks = async (req: Request, res: Response) => {
//   try {
//     const tasks = await TaskModel.find();
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch tasks" });
//   }
// };

// // GET /tasks/:id
// export const getTaskById = async (req: Request, res: Response) => {
//   try {
//     const task = await TaskModel.findById(req.params.id);
//     if (!task) return res.status(404).json({ message: "Task not found" });
//     res.json(task);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch task" });
//   }
// };

// // POST /tasks
// export const createTask = async (req: Request, res: Response) => {
//   try {
//     const {
//       title,
//       description,
//       priority,
//       status,
//       projectId,
//       owner,
//       createDate,
//     } = req.body;

//     const newTask = new TaskModel({
//       title,
//       description,
//       priority,
//       status,
//       projectId,
//       owner,
//       createDate,
//     });

//     await newTask.save();
//     res.status(201).json(newTask);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create task" });
//   }
// };

// // PUT /tasks/:id
// export const updateTask = async (req: Request, res: Response) => {
//   try {
//     const {
//       title,
//       description,
//       priority,
//       status,
//       projectId,
//       owner,
//       createDate,
//     } = req.body;

//     const updatedTask = await TaskModel.findByIdAndUpdate(
//       req.params.id,
//       {
//         title,
//         description,
//         priority,
//         status,
//         projectId,
//         owner,
//         createDate,
//       },
//       { new: true }
//     );

//     if (!updatedTask)
//       return res.status(404).json({ message: "Task not found" });

//     res.json(updatedTask);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update task" });
//   }
// };

// // DELETE /tasks/:id
// export const deleteTask = async (req: Request, res: Response) => {
//   try {
//     const deleted = await TaskModel.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Task not found" });

//     res.json({ message: "Task deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete task" });
//   }
// };

import { Request, Response } from "express";
import TaskModel from "../models/taskModel";

// GET /tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// GET /tasks/:id
export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await TaskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch task" });
  }
};

// POST /tasks
export const createTask = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      priority,
      storyId,
      expectedDoneDate,
      state,
      addedDate,
      startDate,
      endDate,
      responsibleUserId,
    } = req.body;

    const newTask = new TaskModel({
      name,
      description,
      priority,
      storyId,
      expectedDoneDate,
      state,
      addedDate,
      startDate,
      endDate,
      responsibleUserId,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create task" });
  }
};

// PUT /tasks/:id
export const updateTask = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      priority,
      storyId,
      expectedDoneDate,
      state,
      addedDate,
      startDate,
      endDate,
      responsibleUserId,
    } = req.body;

    const updatedTask = await TaskModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        priority,
        storyId,
        expectedDoneDate,
        state,
        addedDate,
        startDate,
        endDate,
        responsibleUserId,
      },
      { new: true }
    );

    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

// DELETE /tasks/:id
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const deleted = await TaskModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};
