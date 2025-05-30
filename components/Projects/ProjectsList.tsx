"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import ProjectService from "../../services/ProjectApi";
import { Project } from "../../types/project";
import AddProjectModal from "./Modals/AddProjectModal";
import DeleteProjectModal from "./Modals/DeleteProjectModal";
import EditProjectModal from "./Modals/EditProjectModal";
import { useUser } from "../../context/UserContext";

//React.FC
const ProjectsList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const { currentUser } = useUser();

  const loadProjects = async () => {
    try {
      const savedProjects = await ProjectService.getProjects();
      setProjects(savedProjects);
    } catch (error) {
      console.error("Failed to load projects:", error);
    }
  };

  const handleSaveProject = async (newProject: Project) => {
    await ProjectService.saveProject(newProject);
    loadProjects();
  };
  const handleAskDelete = (project: Project) => {
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };
  const handleConfirmDelete = async () => {
    if (projectToDelete?._id) {
      await ProjectService.deleteProjectById(projectToDelete._id);
      await loadProjects();
    } else {
      console.error("Project ID is missing");
    }
    setProjectToDelete(null);
    setShowDeleteModal(false);
  };
  const handleEditProject = (project: Project) => {
    setProjectToEdit(project);
    setShowEditModal(true);
  };
  const handleSaveEditedProject = async (editedProject: Project) => {
    await ProjectService.updateProject(editedProject);
    loadProjects();
  };

  useEffect(() => {
    const fetchProjects = async () => {
      await loadProjects();
    };
    fetchProjects();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between items-center px-[20%] mb-[10px]">
        <div className="text-lg font-medium">Projects</div>
        {(currentUser?.role === "developer" ||
          currentUser?.role === "devops") && (
          <button
            data-testid="new-project-button"
            className="bg-violet-500 text-white p-2 rounded cursor-pointer hover:bg-violet-600"
            onClick={() => setShowAddModal(true)}
          >
            Add Project
          </button>
        )}
      </div>
      <div>
        {projects.length === 0 ? (
          <p className="text-center">No projects found.</p>
        ) : (
          <ul>
            <div className="flex ml-[20%] mr-[20%] h-auto mb-1">
              <p className="w-[14%] mr-3">Name</p>
              <p className="w-76%">Description</p>
            </div>
            {projects.map((project) => (
              <li
                key={project._id}
                className="flex justify-between items-center ml-[20%] mr-[20%] h-auto group mb-1 border border-gray-700 rounded-md p-1"
              >
                <Link
                  href={`/projects/${project._id}`}
                  className="flex w-full mb-2 md:w-[70%] cursor-pointer"
                >
                  <div className="flex w-full mb-2 md:w-[70%] items-center">
                    <div className="w-[30%] text-ellipsis overflow-hidden whitespace-nowrap mr-3">
                      {project.name}
                    </div>
                    <div className="w-[70%] text-sm break-words whitespace-normal overflow-hidden overflow-ellipsis">
                      {project.description}
                    </div>
                  </div>
                </Link>
                <div className="flex space-x-2">
                  {(currentUser?.role === "developer" ||
                    currentUser?.role === "devops") && (
                    <button
                      className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 cursor-pointer"
                      onClick={() => handleEditProject(project)}
                    >
                      Edit
                    </button>
                  )}
                  {(currentUser?.role === "developer" ||
                    currentUser?.role === "devops") && (
                    <button
                      className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                      onClick={() => handleAskDelete(project)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        <AddProjectModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleSaveProject}
        />
        <DeleteProjectModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setProjectToDelete(null);
          }}
          onConfirmDelete={handleConfirmDelete}
          projectName={projectToDelete?.name}
          projectId={projectToDelete?._id}
        />
        <EditProjectModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          projectToEdit={
            projectToEdit || { _id: "", name: "", description: "" }
          }
          onSave={handleSaveEditedProject}
        />
      </div>
    </div>
  );
};

export default ProjectsList;
