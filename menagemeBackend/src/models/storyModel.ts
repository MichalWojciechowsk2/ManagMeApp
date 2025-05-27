import { Schema, model, Document, Types } from "mongoose";

export interface IStory extends Document {
  name: string;
  description: string;
  priority: "low" | "medium" | "high";
  projectId: Types.ObjectId;
  createDate: Date | null;
  state: "todo" | "doing" | "done";
  owner: string;
}

const storySchema = new Schema<IStory>({
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
    required: true,
    default: "low",
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project", //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    required: true,
  },
  createDate: {
    type: Date,
    default: null,
  },
  state: {
    type: String,
    enum: ["todo", "doing", "done"],
    required: true,
    default: "todo",
  },
  owner: {
    type: String,
    required: true,
  },
});

const StoryModel = model<IStory>("Story", storySchema);

export default StoryModel;
