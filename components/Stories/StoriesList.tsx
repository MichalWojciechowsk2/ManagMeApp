import React, { useState, useEffect } from "react";
import { Storie } from "../../types/stories";
import StorieService from "../../services/StoriesService";
import AddStoriesComponent from "./CrudComponents/AddStoriesComponent";
import DeleteStorieModal from "./CrudComponents/DeleteStorieModal";

interface StoriesListProps {
  projectId: string;
}

const StoriesList: React.FC<StoriesListProps> = ({ projectId }) => {
  const [stories, setStories] = useState<Storie[]>([]);
  const [showAddComponent, setShowAddComponent] = useState<boolean>(false);
  const [filter, setFilter] = useState<"todo" | "doing" | "done" | "all">(
    "all"
  );
  const [storieToDelete, setStorieToDelete] = useState<Storie | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const loadStories = () => {
    const savedStories = StorieService.getStories().filter(
      (storie) => storie.projectId === projectId
    );
    setStories(savedStories);
  };
  useEffect(() => {
    loadStories();
  }, []);

  const handleSaveStorie = (newStorie: Storie) => {
    StorieService.saveStorie(newStorie);
    loadStories();
  };
  const handleAskDelete = (storie: Storie) => {
    setStorieToDelete(storie);
    setShowDeleteModal(true);
  };
  const handleConfirmDelete = () => {
    if (storieToDelete) {
      StorieService.deleteStorieById(storieToDelete.id);
      loadStories();
      setStorieToDelete(null);
      setShowDeleteModal(false);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={() => setShowAddComponent(true)}
          className="bg-violet-500 text-white p-2 rounded cursor-pointer hover:bg-violet-600 mr-10"
        >
          Add Stories
        </button>
      </div>
      <AddStoriesComponent
        isClicked={showAddComponent}
        onClose={() => setShowAddComponent(false)}
        onSave={handleSaveStorie}
        projectId={projectId}
      />
      <div className="ml-5 mr-5 mt-5">
        <div className="flex justify-between items-center px-[20%] mb-[10px]">
          <h3 className="text-lg font-medium">Stories</h3>
          <div>
            <label className="block text-sm font-medium">Filter</label>
            <select
              className="bg-gray-100 text-gray-600 rounded"
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as "todo" | "doing" | "done" | "all")
              }
            >
              <option value="all">All</option>
              <option value="todo">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>
        <ul>
          <div className="flex ml-[20%] mr-[20%] h-auto mb-1">
            <p className="w-[14%] mr-3">Name</p>
            <p className="w-76%">Description</p>
          </div>
          {stories
            .filter((storie) => filter === "all" || storie.state === filter)
            .map((storie) => (
              <li
                key={storie.id}
                className="flex justify-between items-center ml-[20%] mr-[20%] h-auto group odd:bg-[#151d30] even:bg-[#182236] hover:bg-[#202e4b]"
              >
                <div className="w-[30%] text-ellipsis overflow-hidden whitespace-nowrap mr-3">
                  {storie.name}
                </div>
                <div className="w-[70%] text-sm break-words whitespace-normal overflow-hidden overflow-ellipsis">
                  {storie.description}
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 cursor-pointer"
                    onClick={() => handleEditStorie(project)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                    onClick={() => handleAskDelete(storie)}
                  >
                    Delete
                  </button>
                </div>
                <EditStorieComponent />
              </li>
            ))}
        </ul>
        <DeleteStorieModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setStorieToDelete(null);
          }}
          onConfirmDelete={handleConfirmDelete}
          storieName={storieToDelete?.name}
        />
      </div>
    </div>
  );
};
export default StoriesList;
