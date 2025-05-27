import { Schema, model, Document, Types } from "mongoose";

export interface ITask extends Document {
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  storyId: Types.ObjectId;
  expectedDoneDate: Date | null;
  state: "todo" | "doing" | "done";
  addedDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  responsibleUserId: Types.ObjectId | null;
}

const taskSchema = new Schema<ITask>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
    required: true,
  },
  storyId: {
    type: Schema.Types.ObjectId,
    ref: "Story",
    required: true,
  },
  expectedDoneDate: {
    type: Date,
    default: null,
  },
  state: {
    type: String,
    enum: ["todo", "doing", "done"],
    default: "todo",
    required: true,
  },
  addedDate: {
    type: Date,
    default: () => new Date(),
    required: true,
  },
  startDate: {
    type: Date,
    default: null,
  },
  endDate: {
    type: Date,
    default: null,
  },
  responsibleUserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const TaskModel = model<ITask>("Task", taskSchema);

export default TaskModel;
