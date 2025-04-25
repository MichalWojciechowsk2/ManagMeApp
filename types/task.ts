import { User } from "./user";

export interface Task {
  id: string;
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  storyId: string;
  doneDate: Date | null;
  state: "todo" | "doing" | "done";
  addedDate: Date;
  endDate: Date | null;
  responsibleUserId: string;
}
