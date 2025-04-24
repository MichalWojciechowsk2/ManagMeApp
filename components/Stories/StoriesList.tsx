import React, { useState, useEffect } from "react";
import { Storie } from "../../types/stories";
import StorieService from "../../services/StoriesService";
import AddStoriesComponent from "./CrudComponents/AddStoriesComponent";
import DeleteStorieModal from "./CrudComponents/DeleteStorieModal";
import EditStorieComponent from "./CrudComponents/EditStorieComponent";
import Link from "next/link";

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
  const [storieToEdit, setStorieToEdit] = useState<Storie | null>(null);
  const [showEdit, setShowEdit] = useState<boolean>(false);

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

  const handleEditStorie = (storie: Storie) => {
    setStorieToEdit(storie);
    setShowEdit(true);
  };

  const handleSaveEditStorie = (editedStorie: Storie) => {
    StorieService.updateStorie(editedStorie);
    loadStories();
    setShowEdit(false);
    setStorieToEdit(null);
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
        <div className="flex justify-between items-center mb-5">
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
          <div className="flex mb-2">
            <p className="w-[14%] mr-3">Name</p>
            <p className="w-[24%]">Description</p>
            <p className="w-[50%]">State</p>
            <p className="w-[12%]">Actions</p>
          </div>
          {stories
            .filter((storie) => filter === "all" || storie.state === filter)
            .map((storie) => (
              <React.Fragment key={storie.id}>
                <li className="flex justify-between items-center group odd:bg-[#151d30] even:bg-[#182236] hover:bg-[#202e4b] mb-2 rounded-lg">
                  <Link
                    href={`/projects/${projectId}/stories/${storie.id}`}
                    className="flex w-full mb-2 md:w-[70%] cursor-pointer"
                  >
                    <div className="w-[20%] text-ellipsis overflow-hidden whitespace-nowrap mr-3">
                      {storie.name}
                    </div>
                    <div className="w-[35%] text-sm break-words whitespace-normal overflow-hidden overflow-ellipsis">
                      {storie.description}
                    </div>
                    <div className="w-[25%] text-sm break-words whitespace-normal overflow-hidden overflow-ellipsis">
                      {storie.state}
                    </div>
                  </Link>
                  <div className="w-[20%] flex space-x-2 justify-end">
                    <button
                      className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 cursor-pointer"
                      onClick={() => handleEditStorie(storie)}
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
                </li>
                {showEdit && storieToEdit?.id === storie.id && (
                  <div className="ml-[20%] mr-[20%] bg-white rounded-b shadow-md">
                    <EditStorieComponent
                      isOpen={showEdit}
                      onClose={() => setShowEdit(false)}
                      storieToEdit={storieToEdit}
                      onSave={handleSaveEditStorie}
                    />
                  </div>
                )}
              </React.Fragment>
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
