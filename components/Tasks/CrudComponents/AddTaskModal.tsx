import React, { useEffect, useState } from "react";
import { Task } from "../../../types/task";
import UserService from "../../../services/UserApiService";
import { User } from "../../../types/user";

interface AddTaskProps {
  isClicked: boolean;
  onClose: () => void;
  onSave: (newStorie: Task) => void;
  storyId: string;
}
const AddTaskComponent: React.FC<AddTaskProps> = ({
  isClicked,
  onClose,
  onSave,
  storyId,
}) => {
  const defaultAddForm: Task = {
    id: "",
    name: "",
    description: "",
    priority: "low",
    storyId: "",
    expectedDoneDate: null,
    state: "todo",
    addedDate: new Date(),
    startDate: null,
    endDate: null,
    responsibleUserId: null,
  };
  const [newTask, setNewTask] = useState<Task>(defaultAddForm);
  const resetForm = () => {
    setNewTask(defaultAddForm);
  };
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const u = UserService.getLoggedInUser();
    setUser(u);
  }, []);
  const handleAddNewTask = () => {
    if (!user) {
      console.error("No logged in user");
      return;
    }
    if (newTask.name && newTask.description && newTask.priority) {
      newTask.id = Math.random().toString(36).substring(2, 9);
      newTask.storyId = storyId;
      newTask.addedDate = new Date();
      newTask.responsibleUserId = null;
      newTask.state = "todo";
      onSave(newTask);
      setNewTask(newTask);
      onClose();
    }
  };
  return (
    isClicked && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="ml-[20%] mr-[20%] mt-5 bg-slate-600 rounded p-2 w-1/4 h-2/5">
          <h2 className="text-center">Add New Task</h2>
          <div className="ml-1">
            <div className="mb-2">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                value={newTask.name}
                onChange={(e) =>
                  setNewTask({ ...newTask, name: e.target.value })
                }
                className="bg-gray-100 text-gray-600 rounded w-1/2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="bg-gray-100 text-gray-600 rounded w-1/1 h-25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Priority</label>
              <select
                className="bg-gray-100 text-gray-600 rounded w-1/4"
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
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
              <label className="block text-sm font-medium">
                Expected done date
              </label>
              <input
                type="date"
                className="bg-gray-100 text-gray-600 rounded w-1/4"
                value={
                  newTask.expectedDoneDate
                    ? new Date(newTask.expectedDoneDate)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    expectedDoneDate: new Date(e.target.value),
                  })
                }
              />
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
                handleAddNewTask();
                resetForm();
              }}
              className="bg-violet-500 hover:bg-violet-700 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              Save
            </button>
          </div>
          <div className="h-2"></div>
        </div>
      </div>
    )
  );
};

export default AddTaskComponent;
