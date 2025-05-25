// import React, { useEffect, useState } from "react";
// import { Task } from "../../types/task";
// import TaskService from "../../services/TaskService";

// interface TaskDetailsProps {
//   isOpen: boolean;
//   onClose: () => void;
//   taskToEdit: Task;
//   onSave: (editedTask: Task) => void;
// }

// const TaskDetailsEdit: React.FC<TaskDetailsProps> = ({
//   isOpen,
//   onClose,
//   onSave,
//   taskToEdit,
// }) => {
//   const [priority, setPriority] = useState<"low" | "medium" | "high">(
//     taskToEdit.priority
//   );
//   const [expectedDoneDate, setExpectedDoneDate] = useState<Date | null>(
//     taskToEdit.expectedDoneDate
//   );
//   const [state, setState] = useState<"todo" | "doing" | "done">(
//     taskToEdit.state
//   );
//   const [responsibleUserId, setResponsibleUserId] = useState<string | null>(
//     taskToEdit.responsibleUserId
//   );

//   const handleSave = () => {
//     const updatedTask = {
//       ...taskToEdit,
//       priority,
//       expectedDoneDate,
//       state,
//       responsibleUserId,
//     };
//     onSave(updatedTask);
//     onClose();
//   };

//   useEffect(() => {
//     if (isOpen) {
//       setPriority(taskToEdit.priority);
//       setExpectedDoneDate(taskToEdit.expectedDoneDate);
//       setState(taskToEdit.state);
//       setResponsibleUserId(taskToEdit.responsibleUserId);
//     }
//   }, [isOpen, taskToEdit]);

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 mt-6 max-w-3xl mx-auto text-gray-800">
//       <h2 className="text-2xl font-semibold mb-4">{taskToEdit.name}</h2>

//       <div className="mb-6">
//         <label className="block font-medium text-gray-700">Description:</label>
//         <p className="mt-1 text-gray-600 whitespace-pre-wrap">
//           {taskToEdit.description}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <div>
//           <label className="block font-medium text-gray-700">Priority:</label>
//           <p className="mt-1 capitalize">{taskToEdit.priority}</p>
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700">State:</label>
//           <p className="mt-1 capitalize">{taskToEdit.state}</p>
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700">Added Date:</label>
//           <p className="mt-1">{taskToEdit.addedDate.toLocaleDateString()}</p>
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700">Start date:</label>
//           <p className="mt-1">
//             {taskToEdit.startDate
//               ? taskToEdit.startDate.toLocaleDateString()
//               : "Not started"}
//           </p>
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700">End Date:</label>
//           <p className="mt-1">
//             {taskToEdit.endDate
//               ? taskToEdit.endDate.toLocaleDateString()
//               : "Not completed"}
//           </p>
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700">
//             Assigned User:
//           </label>
//           <p className="mt-1">
//             {taskToEdit.responsibleUserId
//               ? taskToEdit.responsibleUserId
//               : "Not assigned"}
//           </p>
//         </div>

//         <div>
//           <label className="block font-medium text-gray-700">
//             Expected Done Date:
//           </label>
//           <p className="mt-1">
//             {taskToEdit.expectedDoneDate
//               ? taskToEdit.expectedDoneDate.toLocaleDateString()
//               : "Not completed"}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default TaskDetailsEdit;

// //Tutaj po naciśnięciu przycisku edit w TaskDetails będzie
// //możliwość przypisania/zmiany assigned User, State
// // if assignedUser != state.todo
// // if state=done = set done date
// // set end date
// // done date zmienic na start date czyli przypisuje sie w momencie kiedy uzytkownik zmieni stan na doing
