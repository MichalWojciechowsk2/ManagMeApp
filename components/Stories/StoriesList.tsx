import React, { useState, useEffect } from "react";
import { Project } from "../../types/project";
import { Storie } from "../../types/stories";
import StorieService from "../../services/StoriesService";
import { User } from "../../types/user";
import AddStoriesComponent from "./CrudComponents/AddStoriesComponent";

interface StoriesListProps {
  projectId: string;
}

//List gets project from page so in () write project: Project, user: User
const StoriesList: React.FC<StoriesListProps> = (projectId) => {
  const [stories, setStories] = useState<Storie[]>([]);
  const [showAddComponent, setShowAddComponent] = useState<boolean>(false);
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

  return (
    <div>
      <button onClick={() => setShowAddComponent(true)}>Add Stories</button>
      <AddStoriesComponent
        isClicked={showAddComponent}
        onClose={() => setShowAddComponent(false)}
        onSave={handleSaveStorie}
        projectId={projectId}
      />
    </div>
  );
};
export default StoriesList;
