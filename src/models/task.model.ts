import { Schema, model, Document, Types } from "mongoose";

export enum TaskStatus {
  PENDING = "pending",
  COMPLETED = "completed"
}

export interface ITaskModel extends Document {
  title: string;
  description?: string;
  dueTime: Date;
  student: Types.ObjectId;
  status: TaskStatus;
}

const schema = new Schema<ITaskModel>(
  {
    title: { type: String, required: true },
    description: String,
    dueTime: { type: Date, required: true },
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING
    }
  },
  { timestamps: true }
);

export default model<ITaskModel>("Task", schema);
