import React, { useState, useEffect } from "react";
import { Storie } from "../../types/stories";
import StorieService from "../../services/StoriesApi";
import AddStoriesComponent from "./CrudComponents/AddStoriesComponent";
import DeleteStorieModal from "./CrudComponents/DeleteStorieModal";
import EditStorieComponent from "./CrudComponents/EditStorieComponent";
import Link from "next/link";
import { useUser } from "../../context/UserContext";

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
  const { currentUser } = useUser();

  // const loadStories = async () => {
  //   try {
  //     const savedStories = await StorieService.getStories();
  //     setStories(savedStories);
  //   } catch (error) {
  //     console.error("Failed to load stories:", error);
  //   }

  //   // const savedStories = StorieService.getStories().filter(
  //   //   (storie) => storie.projectId === projectId
  //   // );
  //   // setStories(savedStories);
  // };
  const loadStories = async () => {
    try {
      const stories = await StorieService.getStories();
      const savedStories = stories.filter(
        (storie: Storie) => storie.projectId === projectId
      );
      setStories(savedStories);
    } catch (error) {
      console.error("Failed to load stories:", error);
    }
  };

  useEffect(() => {
    const fetchStories = async () => {
      await loadStories();
    };
    fetchStories();
  }, []);

  const handleSaveStorie = async (newStorie: Storie) => {
    await StorieService.saveStorie(newStorie);
    loadStories();
  };

  const handleAskDelete = (storie: Storie) => {
    setStorieToDelete(storie);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (storieToDelete?._id) {
      await StorieService.deleteStorieById(storieToDelete._id);
      await loadStories();
    } else {
      console.error("Story ID is missing");
    }
    setStorieToDelete(null);
    setShowDeleteModal(false);
  };

  const handleEditStorie = (storie: Storie) => {
    setStorieToEdit(storie);
    setShowEdit(true);
  };

  const handleSaveEditStorie = async (editedStorie: Storie) => {
    await StorieService.updateStorie(editedStorie);
    loadStories();
    setShowEdit(false);
    setStorieToEdit(null);
  };

  return (
    <div>
      <div className="flex justify-end">
        {(currentUser?.role === "developer" ||
          currentUser?.role === "devops") && (
          <button
            data-testid="addstories"
            onClick={() => setShowAddComponent(true)}
            className="bg-violet-500 text-white p-2 rounded cursor-pointer hover:bg-violet-600 mr-10"
          >
            Add Stories
          </button>
        )}
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
              <React.Fragment key={storie._id}>
                <li className="flex justify-between items-center group border border-gray-700 rounded-md mb-1 p-1">
                  <Link
                    href={`/projects/${projectId}/stories/${storie._id}`}
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
                    {(currentUser?.role === "developer" ||
                      currentUser?.role === "devops") && (
                      <button
                        className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 cursor-pointer"
                        onClick={() => handleEditStorie(storie)}
                      >
                        Edit
                      </button>
                    )}
                    {(currentUser?.role === "developer" ||
                      currentUser?.role === "devops") && (
                      <button
                        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                        onClick={() => handleAskDelete(storie)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </li>
                {showEdit && storieToEdit?._id === storie._id && (
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
