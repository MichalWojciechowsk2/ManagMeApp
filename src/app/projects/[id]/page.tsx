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
          <h1>{project.name}</h1>
          <p>{project.description}</p>
          <StoriesList projectId={id} />
        </div>
      ) : (
        <div>Loading project...</div>
      )}
    </div>
  );
}
