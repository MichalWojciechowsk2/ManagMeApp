import React, { useEffect, useState } from "react";
import { Project } from "../../../types/project";

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectToEdit: Project;
  onSave: (editedProject: Project) => void;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({
  isOpen,
  onClose,
  onSave,
  projectToEdit,
}) => {
  const [name, setName] = useState<string>(projectToEdit.name);
  const [description, setDescription] = useState<string>(
    projectToEdit.description
  );

  useEffect(() => {
    if (isOpen) {
      setName(projectToEdit.name);
      setDescription(projectToEdit.description);
    }
  }, [isOpen, projectToEdit]);

  const handleSave = () => {
    const updatedProject = { ...projectToEdit, name, description };
    onSave(updatedProject);
    onClose();
  };
  return isOpen ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl mb-4 c-black">Edit Project</h2>
        <div className="mb-2">
          <label className="block text-sm font-medium ">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full h-40 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default EditProjectModal;
