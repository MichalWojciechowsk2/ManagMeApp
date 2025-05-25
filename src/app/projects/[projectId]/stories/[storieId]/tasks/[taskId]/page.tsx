"use client";
import { useParams } from "next/navigation";
import { Task } from "../../../../../../../../types/task";
import { useEffect, useState } from "react";
import TaskService from "../../../../../../../../services/TaskService";
import TaskDetails from "../../../../../../../../components/Tasks/TaskDetails";

export default function TasksStoriesPage() {
  const { projectId, storieId, taskId } = useParams();
  const [task, setTask] = useState<Task | null>(null);
  useEffect(() => {
    if (typeof taskId === "string") {
      const foundTask = TaskService.getTaskById(taskId);
      setTask(foundTask ?? null);
    }
  }, [taskId]);
  return (
    <div>
      {task ? (
        <div>
          <TaskDetails
            taskId={taskId as string}
            storieId={storieId as string}
          />
        </div>
      ) : (
        <div>Loading task...</div>
      )}
    </div>
  );
}
