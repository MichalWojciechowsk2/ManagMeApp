import React, { useState, useEffect } from "react";
import AddTaskComponent from "./CrudComponents/AddTaskModal";
import { Task } from "../../types/task";
import TaskService from "../../services/TaskApi";
import EditTaskModal from "./CrudComponents/EditTaskModal";
import DeleteTaskModal from "./CrudComponents/DeleteTaskModal";
import Link from "next/link";
import { useUser } from "../../context/UserContext";

interface StoriesListProps {
  projectId: string;
  storyId: string;
}

const TasksList: React.FC<StoriesListProps> = ({ projectId, storyId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddComponent, setShowAddComponent] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);
  const { currentUser } = useUser();

  const loadTasks = async () => {
    try {
      const savedTasks = await TaskService.getTasks();
      setTasks(savedTasks);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSaveTask = async (newTask: Omit<Task, "_id">) => {
    try {
      await TaskService.saveTask(newTask);
      await loadTasks();
      setShowAddComponent(false);
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setShowEditModal(true);
  };

  const handleSaveEditTask = async (editedTask: Task) => {
    try {
      await TaskService.updateTask(editedTask);
      await loadTasks();
      setShowEditModal(false);
      setTaskToEdit(null);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDeleteTaskModal = (task: Task) => {
    setTaskToDelete(task);
    setShowDeleteTaskModal(true);
  };

  const handleDeleteTaskConfirmModal = async () => {
    if (!taskToDelete) return;

    try {
      await TaskService.deleteTaskById(taskToDelete._id);
      await loadTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    } finally {
      setTaskToDelete(null);
      setShowDeleteTaskModal(false);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        {(currentUser?.role === "developer" ||
          currentUser?.role === "devops") && (
          <button
            onClick={() => setShowAddComponent(true)}
            className="bg-violet-500 text-white p-2 rounded cursor-pointer hover:bg-violet-600 mr-10"
          >
            Add Task
          </button>
        )}
      </div>
      <div className="flex space-x-2 ml-5 mr-5 mt-5">
        {["todo", "doing", "done"].map((state) => (
          <div key={state} className="bg-[#182236] w-[33%] rounded">
            <div className="text-center capitalize">
              {state.replace("todo", "To do")}
            </div>
            <ul>
              {tasks
                .filter((task) => task.state === state)
                .map((task) => (
                  <li
                    key={task._id}
                    className="flex justify-between items-center group mb-2 rounded-lg"
                  >
                    <Link
                      href={`/projects/${projectId}/stories/${storyId}/tasks/${task._id}`}
                    >
                      <div>{task.name}</div>
                    </Link>
                    <div>
                      {(currentUser?.role === "developer" ||
                        currentUser?.role === "devops") && (
                        <>
                          <button
                            onClick={() => handleEditTask(task)}
                            className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 cursor-pointer mr-1"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTaskModal(task)}
                            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      <AddTaskComponent
        isClicked={showAddComponent}
        onClose={() => setShowAddComponent(false)}
        onSave={handleSaveTask}
        storyId={storyId}
      />
      <EditTaskModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        taskToEdit={
          taskToEdit || {
            _id: "",
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
          }
        }
        onSave={handleSaveEditTask}
      />
      <DeleteTaskModal
        isOpen={showDeleteTaskModal}
        onClose={() => {
          setShowDeleteTaskModal(false);
          setTaskToDelete(null);
        }}
        onConfirmDelete={handleDeleteTaskConfirmModal}
        taskName={taskToDelete?.name}
      />
    </div>
  );
};

export default TasksList;
