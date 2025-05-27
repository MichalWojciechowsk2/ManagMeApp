import { Task } from "../types/task";

const BASE_URL = "http://localhost:5000/api/tasks";

class TaskService {
  // CREATE
  static async saveTask(task: Omit<Task, "_id">): Promise<Task> {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (!res.ok) throw new Error("Failed to save task");
    return res.json();
  }

  // GET ALL
  static async getTasks(): Promise<Task[]> {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  }

  // GET BY ID
  static async getTaskById(id: string): Promise<Task> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch task");
    return res.json();
  }

  // UPDATE
  static async updateTask(task: Task): Promise<Task> {
    const res = await fetch(`${BASE_URL}/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });

    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
  }

  // DELETE
  static async deleteTaskById(id: string): Promise<void> {
    if (!id) throw new Error("Invalid task ID");

    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Failed to delete task:", errorText);
      throw new Error("Failed to delete task");
    }
  }
}

export default TaskService;
