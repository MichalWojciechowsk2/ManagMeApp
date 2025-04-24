export interface Task {
  id: string;
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  storyId: string;
  expectedDoneDate: Date;
  state: "todo" | "doing" | "done";
  addedDate: Date;
  endDate: Date;
  responsibleUser: string;
}
