import React, { useState } from "react";
import { Project } from "../../../types/project";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newProject: Project) => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [newProject, setNewProject] = useState<Project>({
    id: "",
    name: "",
    description: "",
  });

  //Adding new project:
  const handleAddProject = () => {
    if (newProject.name && newProject.description) {
      newProject.id = Math.random().toString(36).substring(2, 9);
      onSave(newProject);
      setNewProject({ id: "", name: "", description: "" });
      onClose();
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-1/3">
          <h2 className="text-xl mb-4 c-black text-gray-700">
            Add New Project
          </h2>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
              className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={newProject.description}
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
              className="mt-1 p-2 w-full h-40 border border-gray-300 rounded-md text-gray-600"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAddProject}
              className="bg-violet-500 hover:bg-violet-700 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddProjectModal;
