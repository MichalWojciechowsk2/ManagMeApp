import React, { useState, useEffect } from "react";
import AddTaskComponent from "./CrudComponents/AddTaskModal";
import { Task } from "../../types/task";
import TaskService from "../../services/TaskService";

interface StoriesListProps {
  storyId: string;
}

const TasksList: React.FC<StoriesListProps> = ({ storyId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddComponent, setShowAddComponent] = useState<boolean>(false);
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
        <div className="bg-[#182236] w-[33%]">
          <div className="text-center">To do</div>
          <ul>
            {tasks
              .filter((task) => task.state === "todo")
              .map((task) => (
                <li key={task.id} className="ml-2">
                  {task.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="bg-[#182236] w-[33%]">
          <div className="text-center">Doing</div>
          <ul>
            {tasks
              .filter((task) => task.state === "doing")
              .map((task) => (
                <li key={task.id} className="ml-2">
                  {task.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="bg-[#182236] w-[33%]">
          <div className="text-center">Done</div>
          <ul>
            {tasks
              .filter((task) => task.state === "done")
              .map((task) => (
                <li key={task.id} className="ml-2">
                  {task.name}
                </li>
              ))}
          </ul>
          <AddTaskComponent
            isClicked={showAddComponent}
            onClose={() => setShowAddComponent(false)}
            onSave={handleSaveTask}
            storyId={storyId}
          />
        </div>
      </div>
    </div>
  );
};
export default TasksList;

// I made stories thought that it shoud look like this microtasks and now
// refactor that code
