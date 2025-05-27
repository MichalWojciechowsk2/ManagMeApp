export interface Storie {
  _id: string;
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  projectId: string;
  createDate: Date | null;
  state: "todo" | "doing" | "done";
  owner: string;
}
