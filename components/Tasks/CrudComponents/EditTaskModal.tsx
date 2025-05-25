import React, { useEffect, useState } from "react";
import { Task } from "../../../types/task";
import { User } from "../../../types/user";
import { useUser } from "../../../context/UserContext";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit: Task;
  onSave: (editedTask: Task) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  taskToEdit,
}) => {
  const [name, setName] = useState<string>(taskToEdit.name);
  const [description, setDescription] = useState<string>(
    taskToEdit.description
  );
  const [priority, setPriority] = useState<"low" | "medium" | "high">(
    taskToEdit.priority
  );
  const [state, setState] = useState<"todo" | "doing" | "done">(
    taskToEdit.state
  );
  const [responsibleUserId, setResponsibleUserId] = useState<string | null>(
    taskToEdit.responsibleUserId
  );

  const { allUsers } = useUser();

  useEffect(() => {
    if (isOpen) {
      setName(taskToEdit.name);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
      setState(taskToEdit.state);
      setResponsibleUserId(taskToEdit.responsibleUserId);
    }
  }, [isOpen, taskToEdit]);

  const handleSave = () => {
    const updatedTask = {
      ...taskToEdit,
      name,
      description,
      priority,
      state,
      responsibleUserId,
    };
    onSave(updatedTask);
    onClose();
  };
  return isOpen ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl mb-4 c-black text-gray-700">Edit Task</h2>
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full h-40 border border-gray-300 rounded-md text-gray-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "low" | "medium" | "high")
            }
            className="mt-1 p-2 w-full h-10 border border-gray-300 rounded-md text-gray-600"
          ></select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>
          <select
            value={state}
            onChange={(e) =>
              setState(e.target.value as "todo" | "doing" | "done")
            }
            className="mt-1 p-2 w-full h-10 border border-gray-300 rounded-md text-gray-600"
          >
            <option value="todo">To do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Responsible user
          </label>
          <select
            value={responsibleUserId || ""}
            onChange={(e) => setResponsibleUserId(e.target.value)}
            className="mt-1 p-2 w-full h-10 border border-gray-300 rounded-md text-gray-600"
          >
            <option value="">Don't assign</option>
            {allUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} {user.surname} {user.role}
              </option>
            ))}
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
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
export default EditTaskModal;
