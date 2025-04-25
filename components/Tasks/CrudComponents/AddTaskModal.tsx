import React, { useEffect, useState } from "react";
import { Task } from "../../../types/task";
import UserService from "../../../services/UserService";
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
    doneDate: null,
    state: "todo",
    addedDate: new Date(),
    endDate: null,
    responsibleUserId: "",
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
    if (
      newTask.name &&
      newTask.description &&
      newTask.priority &&
      newTask.state
    ) {
      newTask.id = Math.random().toString(36).substring(2, 9);
      newTask.storyId = storyId;
      newTask.addedDate = new Date();
      // if (!newTask.responsibleUserId) {
      //   newTask.responsibleUserId = "";
      // }
      onSave(newTask);
      setNewTask(newTask);
      onClose();
    }
  };
  return (
    isClicked && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="ml-[20%] mr-[20%] mt-5 bg-slate-600 rounded">
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
                className="bg-gray-100 text-gray-600 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <input
                type="text"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="bg-gray-100 text-gray-600 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Priority</label>
              <select
                className="bg-gray-100 text-gray-600 rounded"
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
              <label className="block text-sm font-medium">State</label>
              <select
                className="bg-gray-100 text-gray-600 rounded"
                value={newTask.state}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    state: e.target.value as "todo" | "doing" | "done",
                  })
                }
              >
                <option value="todo">To do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">
                Responsible User
              </label>
              <select
                className="bg-gray-100 text-gray-600 rounded"
                value={newTask.responsibleUserId}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    responsibleUserId: e.target.value,
                  })
                }
              >
                <option value="">Dont assigne</option>
                <option value="u1">Michał Wojciechowski (Admin)</option>
                <option value="u2">Adam Nowak (DevOps)</option>
                <option value="u3">Marcin Kłos (Developer)</option>
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
