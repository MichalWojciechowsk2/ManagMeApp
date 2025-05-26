"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import ProjectService from "../../services/ProjectService";
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

  const loadProjects = () => {
    const savedProjects = ProjectService.getProjects();
    setProjects(savedProjects);
  };

  const handleSaveProject = (newProject: Project) => {
    ProjectService.saveProject(newProject);
    loadProjects();
  };
  const handleAskDelete = (project: Project) => {
    setProjectToDelete(project);
    setShowDeleteModal(true);
  };
  const handleConfirmDelete = () => {
    if (projectToDelete) {
      ProjectService.deleteProjectById(projectToDelete.id);
      loadProjects();
    }
    setProjectToDelete(null);
    setShowDeleteModal(false);
  };
  const handleEditProject = (project: Project) => {
    setProjectToEdit(project);
    setShowEditModal(true);
  };
  const handleSaveEditedProject = (editedProject: Project) => {
    ProjectService.updateProject(editedProject);
    loadProjects();
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between items-center px-[20%] mb-[10px]">
        <div className="text-lg font-medium">Projects</div>
        {(currentUser?.role === "developer" ||
          currentUser?.role === "devops") && (
          <button
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
                key={project.id}
                className="flex justify-between items-center ml-[20%] mr-[20%] h-auto group odd:bg-[#151d30] even:bg-[#182236] hover:bg-[#202e4b]"
              >
                <Link
                  href={`/projects/${project.id}`}
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
        />
        <EditProjectModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          projectToEdit={projectToEdit || { id: "", name: "", description: "" }}
          onSave={handleSaveEditedProject}
        />
      </div>
    </div>
  );
};

export default ProjectsList;
