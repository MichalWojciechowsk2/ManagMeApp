// import React, { useState, useEffect } from "react";
// import { Storie } from "../../types/stories";
// import StorieService from "../../services/StoriesService";
// import AddStoriesComponent from "./CrudComponents/AddStoriesComponent";

// interface StoriesListProps {
//   projectId: string;
// }

// const StoriesList: React.FC<StoriesListProps> = ({ projectId }) => {
//   const [stories, setStories] = useState<Storie[]>([]);
//   const [showAddComponent, setShowAddComponent] = useState<boolean>(false);
//   const loadStories = () => {
//     const savedStories = StorieService.getStories().filter(
//       (storie) => storie.projectId === projectId
//     );
//     setStories(savedStories);
//   };
//   useEffect(() => {
//     loadStories();
//   }, []);

//   const handleSaveStorie = (newStorie: Storie) => {
//     StorieService.saveStorie(newStorie);
//     loadStories();
//   };

//   return (
//     <div>
//       <div className="flex justify-end">
//         <button
//           onClick={() => setShowAddComponent(true)}
//           className="bg-violet-500 text-white p-2 rounded cursor-pointer hover:bg-violet-600 mr-10"
//         >
//           Add Stories
//         </button>
//       </div>
//       <AddStoriesComponent
//         isClicked={showAddComponent}
//         onClose={() => setShowAddComponent(false)}
//         onSave={handleSaveStorie}
//         projectId={projectId}
//       />
//       <div className="flex space-x-2 ml-5 mr-5 mt-5">
//         <div className="bg-[#182236] w-[33%]">
//           <div className="text-center">To do</div>
//           <ul>
//             {stories
//               .filter((storie) => storie.state === "todo")
//               .map((storie) => (
//                 <li key={storie.id} className="ml-2">
//                   {storie.name}
//                 </li>
//               ))}
//           </ul>
//         </div>
//         <div className="bg-[#182236] w-[33%]">
//           <div className="text-center">Doing</div>
//           <ul>
//             {stories
//               .filter((storie) => storie.state === "doing")
//               .map((storie) => (
//                 <li key={storie.id} className="ml-2">
//                   {storie.name}
//                 </li>
//               ))}
//           </ul>
//         </div>
//         <div className="bg-[#182236] w-[33%]">
//           <div className="text-center">Done</div>
//           <ul>
//             {stories
//               .filter((storie) => storie.state === "done")
//               .map((storie) => (
//                 <li key={storie.id} className="ml-2">
//                   {storie.name}
//                 </li>
//               ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default StoriesList;

//I made stories thought that it shoud look like this microtasks and now
//refactor that code
