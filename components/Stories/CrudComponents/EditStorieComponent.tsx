import React, { useEffect, useState } from "react";
import { Storie } from "../../../types/stories";

interface EditStorieProps {
  isOpen: boolean;
  onClose: () => void;
  storieToEdit: Storie;
  onSave: (updatedStorie: Storie) => void;
}

const EditStorieComponent: React.FC<EditStorieProps> = ({
  isOpen,
  onClose,
  storieToEdit,
  onSave,
}) => {
  const [name, setName] = useState<string>(storieToEdit.name);
  const [description, setDescription] = useState<string>(
    storieToEdit.description
  );
  const [priority, setPriority] = useState<"low" | "medium" | "high">(
    storieToEdit.priority
  );
  const [state, setState] = useState<"todo" | "doing" | "done">(
    storieToEdit.state
  );
  useEffect(() => {
    if (isOpen) {
      setName(storieToEdit.name);
      setDescription(storieToEdit.description);
      setPriority(storieToEdit.priority);
      setState(storieToEdit.state);
    }
  }, [isOpen, storieToEdit]);
  const handleSave = () => {
    const updatedStorie = {
      ...storieToEdit,
      name,
      description,
      priority,
      state,
    };
    onSave(updatedStorie);
    onClose();
  };

  return isOpen ? (
    <div className="bg-slate-600 p-4">
      <div className="mb-2">
        <label className="block text-xs font-medium ">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 w-full border border-gray-300 rounded-md  text-xs"
        />
      </div>
      <div className="mb-4">
        <label className="block text-xs font-medium ">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 w-full h-20 border border-gray-300 rounded-md  text-xs"
        />
      </div>
      <div className="mb-2">
        <label className="block text-xs font-medium ">Priority</label>
        <select
          className="  rounded text-xs border text-black bg-white"
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "low" | "medium" | "high")
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="block text-xs font-medium ">State</label>
        <select
          className="rounded text-xs border text-black bg-white"
          value={state}
          onChange={(e) =>
            setState(e.target.value as "todo" | "doing" | "done")
          }
        >
          <option value="todo">To do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
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
          className="bg-violet-500 hover:bg-violet-700 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  ) : null;
};

export default EditStorieComponent;
