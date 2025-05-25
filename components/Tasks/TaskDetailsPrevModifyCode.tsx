// import React, { useEffect, useState } from "react";
// import { Task } from "../../types/task";
// import TaskService from "../../services/TaskService";
// import TaskDetailsEdit from "./TaskDetailsEdit";

// interface TaskDetailsProps {
//   taskId: string;
// }

// const TaskDetails: React.FC<TaskDetailsProps> = ({ taskId }) => {
//   const [task, setTask] = useState<Task>();
//   const [showEditTaskDetails, setShowEditTaskDetails] =
//     useState<boolean>(false);
//   const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
//   const loadTask = () => {
//     const taskDetails = TaskService.getTaskById(taskId);
//     setTask(taskDetails);
//   };
//   useEffect(() => {
//     loadTask();
//   }, [taskId]);
//   if (!task) {
//     return <div>Loading Task Details...</div>;
//   }
//   const handleEditTaskDetails = (task: Task) => {
//     setTaskToEdit(task);
//     setShowEditTaskDetails(true);
//   };
//   const handleSaveEditTaskDetails = (editedTask: Task) => {
//     TaskService.updateTask(editedTask);
//     loadTask();
//     setShowEditTaskDetails(false);
//     setTaskToEdit(null);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 mt-6 max-w-3xl mx-auto text-gray-800">
//       <h2 className="text-2xl font-semibold mb-4">{task.name}</h2>

//       <div className="mb-6">
//         <label className="block font-medium text-gray-700">Description:</label>
//         <p className="mt-1 text-gray-600 whitespace-pre-wrap">
//           {task.description}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <div>
//           <label className="block font-medium text-gray-700">Priority:</label>
//           <p className="mt-1 capitalize">{task.priority}</p>
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700">State:</label>
//           <p className="mt-1 capitalize">{task.state}</p>
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700">Added Date:</label>
//           <p className="mt-1">
//             {new Date(task.addedDate).toLocaleDateString()}
//           </p>
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700">Start date:</label>
//           <p className="mt-1">
//             {task.startDate
//               ? new Date(task.startDate).toLocaleDateString()
//               : "Not started"}
//           </p>
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700">End Date:</label>
//           <p className="mt-1">
//             {task.endDate
//               ? new Date(task.endDate).toLocaleDateString()
//               : "Not completed"}
//           </p>
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700">
//             Assigned User:
//           </label>
//           <p className="mt-1">
//             {task.responsibleUserId ? task.responsibleUserId : "Not assigned"}
//           </p>
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700">
//             Expected Done Date:
//           </label>
//           <p className="mt-1">
//             {task.expectedDoneDate
//               ? new Date(task.expectedDoneDate).toLocaleDateString()
//               : "Not completed"}
//           </p>
//         </div>
//       </div>

//       <div className="text-right">
//         <button
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
//           onClick={() => handleEditTaskDetails(task)}
//         >
//           Edit Task
//         </button>
//       </div>

//       {/*
//       <TaskDetailsEdit
//         isOpen={showEditTaskDetails}
//         onClose={() => setShowEditTaskDetails(false)}
//         taskToEdit={
//           taskToEdit || {
//             id: "",
//             name: "",
//             description: "",
//             priority: "low",
//             storyId: "",
//             expectedDoneDate: new Date(),
//             state: "todo",
//             addedDate: new Date(),
//             startDate: new Date(),
//             endDate: new Date(),
//             responsibleUserId: "",
//           }
//         }
//         onSave={handleSaveEditTaskDetails}
//       /> */}
//     </div>
//   );
// };
// export default TaskDetails;
