import React, { useState, useEffect } from "react";
import AddTaskComponent from "./CrudComponents/AddTaskModal";
import { Task } from "../../types/task";
import TaskService from "../../services/TaskService";
import EditTaskModal from "./CrudComponents/EditTaskModal";
import DeleteTaskModal from "./CrudComponents/DeleteTaskModal";

interface StoriesListProps {
  storyId: string;
}

const TasksList: React.FC<StoriesListProps> = ({ storyId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddComponent, setShowAddComponent] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [showDeleteTaskModal, setShowDeleteTaskModal] =
    useState<boolean>(false);

  const loadTasks = () => {
    const savedTasks = TaskService.getTasks().filter(
      (task) => task.storyId === storyId
    );
    setTasks(savedTasks);
  };
  useEffect(() => {
    loadTasks();
  }, []);

  const handleSaveTask = (newTask: Task) => {
    TaskService.saveTask(newTask);
    loadTasks();
  };
  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setShowEditModal(true);
  };
  const handleSaveEditTask = (editedTask: Task) => {
    TaskService.updateTask(editedTask);
    loadTasks();
    setShowEditModal(false);
    setTaskToEdit(null);
  };
  const handleDeleteTaskModal = (task: Task) => {
    setTaskToDelete(task);
    setShowDeleteTaskModal(true);
  };
  const handleDeleteTaskConfirmModal = () => {
    if (taskToDelete) {
      TaskService.deleteTaskById(taskToDelete.id);
      loadTasks();
    }
    setTaskToDelete(null);
    setShowDeleteTaskModal(false);
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddComponent(true)}
          className="bg-violet-500 text-white p-2 rounded cursor-pointer hover:bg-violet-600 mr-10"
        >
          Add Task
        </button>
      </div>
      <div className="flex space-x-2 ml-5 mr-5 mt-5">
        <div className="bg-[#182236] w-[33%] rounded">
          <div className="text-center">To do</div>
          <ul>
            {tasks
              .filter((task) => task.state === "todo")
              .map((task) => (
                <li
                  key={task.id}
                  className="flex justify-between items-center group mb-2 rounded-lg"
                >
                  <div>{task.name}</div>
                  <div>
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
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="bg-[#182236] w-[33%] rounded">
          <div className="text-center">Doing</div>
          <ul>
            {tasks
              .filter((task) => task.state === "doing")
              .map((task) => (
                <li
                  key={task.id}
                  className="flex justify-between items-center group mb-2 rounded-lg"
                >
                  {task.name}
                  <div>
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
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className="bg-[#182236] w-[33%] rounded">
          <div className="text-center">Done</div>
          <ul>
            {tasks
              .filter((task) => task.state === "done")
              .map((task) => (
                <li
                  key={task.id}
                  className="flex justify-between items-center group mb-2 rounded-lg"
                >
                  {task.name}
                  <div>
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
                  </div>
                </li>
              ))}
          </ul>
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
                id: "",
                name: "",
                description: "",
                priority: "low",
                storyId: "",
                doneDate: new Date(),
                state: "todo",
                addedDate: new Date(),
                endDate: new Date(),
                responsibleUserId: "",
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
      </div>
    </div>
  );
};
export default TasksList;

// I probably didnt use update method from taskService and others(Project, stories)
