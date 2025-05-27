import React, { useEffect, useState } from "react";
import { Task } from "../../types/task";
import TaskService from "../../services/TaskApi";
import StorieService from "../../services/StoriesApi";
import UserApiService from "../../services/UserApi";
import { User } from "../../types/user";
import { useUser } from "../../context/UserContext";

interface TaskDetailsProps {
  taskId: string;
  storieId: string;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ taskId }) => {
  const [task, setTask] = useState<Task>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [modifyTask, setModifyTask] = useState<Task>();
  const [responsibleUserId, setResponsibleUserId] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const { currentUser } = useUser();
  const [responsibleUser, setResponsibleUser] = useState<User | null>(null);

  // const loadTask = () => {
  //   const taskDetails = TaskService.getTaskById(taskId);
  //   setTask(taskDetails);
  //   setModifyTask(taskDetails);
  //   setResponsibleUserId(taskDetails?.responsibleUserId || "");
  // };
  const loadTask = async () => {
    try {
      const taskDetails = await TaskService.getTaskById(taskId);
      setTask(taskDetails);
      setModifyTask(taskDetails);
      setResponsibleUserId(taskDetails?.responsibleUserId || "");
    } catch (error) {
      console.error("Failed to load task:", error);
    }
  };

  useEffect(() => {
    loadTask();
  }, [taskId]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await UserApiService.getAllUsers();
        const filteredUsers = users.filter(
          (user) => user.role === "developer" || user.role === "devops"
        );
        setFilteredUsers(filteredUsers);
      } catch (error) {
        console.error(
          "Error while fetching user with devops or developer role:",
          error
        );
      }
    };
    fetchUsers();
  }, []);
  if (!task || !modifyTask) {
    return <div>Loading Task Details...</div>;
  }

  // const saveModifiedTask = () => {
  //   const updatedTask: Task = {
  //     ...modifyTask,
  //     responsibleUserId,
  //   };

  //   TaskService.updateTask(updatedTask);
  //   setIsEditing(false);
  //   loadTask();
  // };
  const saveModifiedTask = async () => {
    try {
      const updatedTask: Task = {
        ...modifyTask!,
        responsibleUserId,
      };

      await TaskService.updateTask(updatedTask);
      setIsEditing(false);
      await loadTask();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  // useEffect(() => {
  //   const fetchResponsibleUser = async () => {
  //     if (task?.responsibleUserId) {
  //       try {
  //         const user = await UserApiService.getUserById(task.responsibleUserId);
  //         setResponsibleUser(user);
  //       } catch (error) {
  //         console.error("Failed to fetch responsible user:", error);
  //       }
  //     } else {
  //       setResponsibleUser(null);
  //     }
  //   };

  //   fetchResponsibleUser();
  // }, [task?.responsibleUserId]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6 max-w-3xl mx-auto text-gray-800">
      <h2 className="text-2xl font-semibold mb-4">{task.name}</h2>

      {/* <div className="mb-6">
        <label className="block font-medium text-gray-700">Storie:</label>
        <p className="mt-1 text-gray-600 whitespace-pre-wrap">
          {StorieService.getStorieById(storieId)}
        </p>
      </div> */}

      <div className="mb-6">
        <label className="block font-medium text-gray-700">Description:</label>
        <p className="mt-1 text-gray-600 whitespace-pre-wrap">
          {task.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* ----------------------------- Priority  -----------------------------*/}
        {isEditing ? (
          <div>
            <label className="block font-medium text-gray-700">Priority</label>
            <select
              className="bg-gray-100 text-gray-600 rounded w-full"
              value={modifyTask.priority}
              onChange={(e) =>
                setModifyTask({
                  ...modifyTask,
                  priority: e.target.value as "low" | "medium" | "high",
                })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        ) : (
          <div>
            <label className="block font-medium text-gray-700">Priority:</label>
            <p className="mt-1 capitalize">{task.priority}</p>
          </div>
        )}

        {/* -----------------------------State -----------------------------*/}
        {isEditing ? (
          <div>
            <label className="block text-sm font-medium">State</label>
            <select
              className="block font-medium text-gray-700"
              value={modifyTask.state}
              onChange={(e) => {
                const newState = e.target.value as "todo" | "doing" | "done";
                let updates: Partial<Task> = { state: newState };
                if (newState === "doing") {
                  updates.startDate = new Date();
                }
                if (newState === "done") {
                  if (!task.startDate) {
                    updates.startDate = new Date();
                  }
                  updates.endDate = new Date();
                }
                if (newState === "todo") {
                  updates.endDate = null;
                  updates.startDate = null;
                  if (task.responsibleUserId) {
                    updates.responsibleUserId = null;
                  }
                }
                setModifyTask({
                  ...modifyTask,
                  ...updates,
                });
              }}
            >
              <option value="todo">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
        ) : (
          <div>
            <label className="block font-medium text-gray-700">State:</label>
            <p className="mt-1 capitalize">{task.state}</p>
          </div>
        )}

        {/* -----------------------------Read-only: Added Date -----------------------------*/}
        <div>
          <label className="block font-medium text-gray-700">Added Date:</label>
          <p className="mt-1">
            {new Date(task.addedDate).toLocaleDateString()}
          </p>
        </div>

        {/* -----------------------------Read-only: Start Date -----------------------------*/}
        <div>
          <label className="block font-medium text-gray-700">Start Date:</label>
          <p className="mt-1">
            {task.startDate
              ? new Date(task.startDate).toLocaleDateString()
              : "Not started"}
          </p>
        </div>

        {/*----------------------------- Read-only: End Date -----------------------------*/}
        <div>
          <label className="block font-medium text-gray-700">End Date:</label>
          <p className="mt-1">
            {task.endDate
              ? new Date(task.endDate).toLocaleDateString()
              : "Not completed"}
          </p>
        </div>

        {/* Responsible User */}
        {isEditing ? (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Responsible user
            </label>
            <select
              className="mt-1 p-2 w-full h-10 border border-gray-300 rounded-md text-gray-600"
              value={responsibleUserId}
              onChange={(e) => {
                const newUser = e.target.value;
                setResponsibleUserId(newUser);
                const updates: Partial<Task> = {
                  responsibleUserId: newUser,
                };
                if (newUser != "" && modifyTask.state === "todo") {
                  updates.state = "doing";
                  updates.startDate = new Date();
                }
                if (newUser === "" && modifyTask.state != "todo") {
                  updates.state = "todo";
                  updates.startDate = null;
                  updates.endDate = null;
                }
                setModifyTask({
                  ...modifyTask,
                  ...updates,
                });
              }}
            >
              <option value="">Don't asigned</option>
              {filteredUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} {user.surname} ({user.role})
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div>
            <label className="block font-medium text-gray-700">
              Assigned User:
            </label>
            {/* <p className="mt-1">
              {responsibleUser
                ? `${responsibleUser.name} ${responsibleUser.surname} (${responsibleUser.role})`
                : "Not assigned"}
            </p> */}
            <p className="mt-1">
              {task.responsibleUserId ? task.responsibleUserId : "Not assigned"}
            </p>
          </div>
        )}

        {/*----------------------------- Expected Done Date -----------------------------*/}
        {isEditing ? (
          <div>
            <label className="block font-medium text-gray-700">
              Expected done date
            </label>
            <input
              type="date"
              className="bg-gray-100 text-gray-600 rounded w-full"
              value={
                modifyTask.expectedDoneDate
                  ? new Date(modifyTask.expectedDoneDate)
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setModifyTask({
                  ...modifyTask,
                  expectedDoneDate: new Date(e.target.value),
                })
              }
            />
          </div>
        ) : (
          <div>
            <label className="block font-medium text-gray-700">
              Expected Done Date:
            </label>
            <p className="mt-1">
              {task.expectedDoneDate
                ? new Date(task.expectedDoneDate).toLocaleDateString()
                : "Not completed"}
            </p>
          </div>
        )}
      </div>

      {/*----------------------------- Action Buttons -----------------------------*/}
      {(currentUser?.role === "devops" ||
        currentUser?.role === "developer") && (
        <div className="text-right space-x-2">
          {isEditing ? (
            <>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded shadow"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
                onClick={saveModifiedTask}
              >
                Save
              </button>
            </>
          ) : (
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
              onClick={() => setIsEditing(true)}
            >
              Edit Task
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskDetails;

//data się nie zmienia
