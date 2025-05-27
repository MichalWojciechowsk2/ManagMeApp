import { User } from "./user";

export interface Task {
  _id: string;
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  storyId: string;
  expectedDoneDate: Date | null;
  state: "todo" | "doing" | "done";
  addedDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  responsibleUserId: string | null;
}
