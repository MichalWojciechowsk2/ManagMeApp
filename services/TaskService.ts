import { Task } from "../types/task";

class TaskService {
  // SAVE
  static saveTask(task: Task): void {
    const tasks = TaskService.getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  // GETALL
  static getTasks(): Task[] {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  }
  // GETBYID
  static getTaskById(id: string): Task | undefined {
    const tasks = TaskService.getTasks();
    const task = tasks.find((task) => task.id === id);
    return task;
  }
  // UPDATE
  static updateTask(updatedTask: Task): void {
    const tasks = TaskService.getTasks();
    const index = tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
  // DELETE
  static deleteTaskById(id: string): void {
    const tasks = TaskService.getTasks();
    const updatedTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }
}

export default TaskService;
