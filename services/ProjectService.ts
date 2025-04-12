import { Project } from "../types/project";

class ProjectService {
  // SAVE
  static saveProject(project: Project): void {
    const projects = ProjectService.getProjects();
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  // GETALL
  static getProjects(): Project[] {
    const projects = localStorage.getItem("projects");
    return projects ? JSON.parse(projects) : [];
  }
  // GETBYID
  static getProjectById(id: string): Project | undefined {
    const projects = ProjectService.getProjects();
    const project = projects.find((project) => project.id === id);
    return project;
  }
  // UPDATE
  static updateProject(updatedProject: Project): void {
    const projects = ProjectService.getProjects();
    const index = projects.findIndex(
      (project) => project.id === updatedProject.id
    );
    if (index !== -1) {
      projects[index] = updatedProject;
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }
  // DELETE
  static deleteProjectById(id: string): void {
    const projects = ProjectService.getProjects();
    const updatedProjects = projects.filter((project) => project.id !== id);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  }
}

export default ProjectService;
