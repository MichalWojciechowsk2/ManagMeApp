import { Project } from "../types/project";

const BASE_URL = "http://localhost:5000/api/projects";

class ProjectService {
  // GET ALL
  static async getProjects(): Promise<Project[]> {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
  }

  // GET BY ID
  static async getProjectById(id: string): Promise<Project> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch project");
    return res.json();
  }

  // CREATE
  static async saveProject(project: Omit<Project, "id">): Promise<Project> {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error("Failed to create project");
    return res.json();
  }

  // UPDATE
  static async updateProject(project: Project): Promise<Project> {
    const res = await fetch(`${BASE_URL}/${project._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!res.ok) throw new Error("Failed to update project");
    return res.json();
  }

  // DELETE
  static async deleteProjectById(id: string): Promise<void> {
    console.log("Deleting project with id:", id);
    if (!id) throw new Error("Cannot delete project: invalid ID");

    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Error response:", errText);
      throw new Error("Failed to delete project");
    }
  }
}

export default ProjectService;
