"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Project } from "../../../../types/project";
import ProjectService from "../../../../services/ProjectService";
import StoriesList from "../../../../components/Stories/StoriesList";

export default function ProjectStoriesPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  useEffect(() => {
    if (typeof id === "string") {
      const foundProject = ProjectService.getProjectById(id);
      setProject(foundProject ?? null);
    }
  }, [id]);
  return (
    <div>
      {project ? (
        <div>
          <div className="flex items-end space-x-10 mb-2 ml-10">
            <h1 className="text-3xl">{project.name}</h1>
            <p className="text-l">{project.description}</p>
          </div>
          <StoriesList projectId={id as string} />
        </div>
      ) : (
        <div>Loading project...</div>
      )}
    </div>
  );
}
