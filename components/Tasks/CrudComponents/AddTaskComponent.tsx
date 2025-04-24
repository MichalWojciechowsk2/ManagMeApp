import React, { useEffect, useState } from "react";
import { Task } from "../../../types/task";
import UserService from "../../../services/UserService";
import { User } from "../../../types/user";

interface AddStoriesProps {
  isClicked: boolean;
  onClose: () => void;
  onSave: (newStorie: Storie) => void;
  projectId: string;
}
const AddStoriesComponent: React.FC<AddStoriesProps> = ({
  isClicked,
  onClose,
  onSave,
  projectId,
}) => {
  const [newStorie, setNewStorie] = useState<Storie>({
    id: "",
    name: "",
    description: "",
    priority: "low",
    projectId: "",
    createDate: null,
    state: "todo",
    owner: "",
  });
  const resetForm = () => {
    setNewStorie({
      id: "",
      name: "",
      description: "",
      priority: "low",
      projectId: "",
      createDate: null,
      state: "todo",
      owner: "",
    });
  };
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const u = UserService.getLoggedInUser();
    setUser(u);
  }, []);
  const handleAddNewStorie = () => {
    if (!user) {
      console.error("No logged in user");
      return;
    }
    if (
      newStorie.name &&
      newStorie.description &&
      newStorie.priority &&
      newStorie.state
    ) {
      newStorie.id = Math.random().toString(36).substring(2, 9);
      newStorie.createDate = new Date();
      newStorie.owner = user.id;
      newStorie.projectId = projectId;
      onSave(newStorie);
      setNewStorie(newStorie);
      onClose();
    }
  };
  return (
    isClicked && (
      <div className="ml-[20%] mr-[20%] mt-5 bg-slate-600 rounded">
        <h2 className="text-center">Add New Storie</h2>
        <div className="ml-1">
          <div className="mb-2">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={newStorie.name}
              onChange={(e) =>
                setNewStorie({ ...newStorie, name: e.target.value })
              }
              className="bg-gray-100 text-gray-600 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              value={newStorie.description}
              onChange={(e) =>
                setNewStorie({ ...newStorie, description: e.target.value })
              }
              className="bg-gray-100 text-gray-600 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Priority</label>
            <select
              className="bg-gray-100 text-gray-600 rounded"
              value={newStorie.priority}
              onChange={(e) =>
                setNewStorie({
                  ...newStorie,
                  priority: e.target.value as "low" | "medium" | "high",
                })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">State</label>
            <select
              className="bg-gray-100 text-gray-600 rounded"
              value={newStorie.state}
              onChange={(e) =>
                setNewStorie({
                  ...newStorie,
                  state: e.target.value as "todo" | "doing" | "done",
                })
              }
            >
              <option value="todo">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mr-5">
          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleAddNewStorie();
              resetForm();
            }}
            className="bg-violet-500 hover:bg-violet-700 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Save
          </button>
        </div>
        <div className="h-2"></div>
      </div>
    )
  );
};

export default AddStoriesComponent;
