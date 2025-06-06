"use client";
import { useParams } from "next/navigation";
import { Storie } from "../../../../../../types/stories";
import { useEffect, useState } from "react";
import StorieService from "../../../../../../services/StoriesApi";
import TasksList from "../../../../../../components/Tasks/TaskList";

export default function TasksStoriesPage() {
  const { projectId, storieId } = useParams();
  const [story, setStory] = useState<Storie | null>(null);
  useEffect(() => {
    if (typeof storieId === "string") {
      const foundStory = StorieService.getStorieById(storieId);
      setStory(foundStory ?? null);
      console.log(`Story ID: ${storieId}`);
      console.log(`Project ID: ${projectId}`);
    }
  }, [storieId]);
  return (
    <div>
      {story ? (
        <div>
          <div className="flex items-end space-x-10 mb-2 ml-10">
            <h1 className="text-3xl">{story.name}</h1>
            <p className="text-l">{story.description}</p>
          </div>
          <TasksList
            projectId={projectId as string}
            storyId={storieId as string}
          />
        </div>
      ) : (
        <div>Loading story...</div>
      )}
    </div>
  );
}
