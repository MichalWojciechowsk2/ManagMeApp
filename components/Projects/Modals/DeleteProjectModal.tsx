import React, { useState } from "react";
import { Project } from "../../../types/project";

interface DeleteProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
  projectName?: string;
  projectId?: string;
}
const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({
  isOpen,
  onClose,
  onConfirmDelete,
  projectName,
}) => {
  const [confirmInput, setConfirmInput] = useState("");
  const [error, setError] = useState("");
  const expectedInput = `I want to delete ${projectName}`;

  const handleDeleteClick = async () => {
    if (confirmInput.trim() === expectedInput) {
      await onConfirmDelete();
      setConfirmInput("");
      setError("");
    } else {
      setError("The confirmation phrase does not match.");
    }
  };
  if (!isOpen || !projectName) return null;
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-2/3 h-1/2">
        <h2 className="text-xl mb-4 text-gray-800 font-semibold">
          Delete Project
        </h2>
        <p className="text-gray-700">
          Are you sure you want to delete {projectName}?
        </p>
        <p className="text-gray-700">
          To delete project write
          <span className="text-red-500">
            {" "}
            "I want to delete {projectName}"{" "}
          </span>
          and click delete.
        </p>
        <input
          type="text"
          placeholder="Type confirmation text"
          value={confirmInput}
          onChange={(e) => setConfirmInput(e.target.value)}
          className="mt-1 p-1 w-full border border-gray-300 rounded-md text-gray-600"
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={() => {
              onClose();
              setConfirmInput("");
              setError("");
            }}
            className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md mr-2 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectModal;
